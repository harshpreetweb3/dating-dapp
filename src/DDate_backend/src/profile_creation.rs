use ic_cdk::api::{caller, management_canister::main::raw_rand, time};
use ic_cdk::{query, update};
use sha2::{Digest, Sha256};
use std::{cell::RefCell, collections::HashMap};

use candid::{CandidType, Principal};
use serde::Deserialize;

#[derive(Clone, Deserialize, CandidType, Debug, PartialEq)]
pub struct UserProfileParams {
    gender: Option<String>, // name , email, gender, preffered gender, age, max, min preffered-age, location, p -loc
    email: Option<String>,
    name: Option<String>,
    mobile_number: Option<String>,
    dob: Option<String>,
    gender_pronouns: Option<String>,
    religion: Option<String>,
    height: Option<String>,
    zodiac: Option<String>,
    diet: Option<String>,
    occupation: Option<String>,
    looking_for: Option<String>,
    smoking: Option<String>,
    drinking: Option<String>,
    hobbies: Option<Vec<String>>,
    sports: Option<Vec<String>>,
    art_and_culture: Option<Vec<String>>,
    pets: Option<String>,
    general_habits: Option<Vec<String>>,
    outdoor_activities: Option<Vec<String>>,
    travel: Option<Vec<String>>,
    movies: Option<Vec<String>>,
    interests_in: Option<String>,
    age: Option<u64>,
    location: Option<String>,
    min_preferred_age: Option<u64>,
    max_preferred_age: Option<u64>,
    preferred_gender: Option<String>,
    preferred_location: Option<String>,
    introduction: Option<String>,
    images: Option<Vec<String>>,
}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct UserProfileCreationInfo {
    user_id: String,
    created_at: u64,
    params: UserProfileParams,
    creator_principal: Principal,
}

thread_local! {
    pub static PROFILES: RefCell<Profile> = RefCell::new(Profile::new())

}

pub struct Profile {
    pub profiles: HashMap<String, UserProfileCreationInfo>,

}

impl Profile {
    pub fn new() -> Self {
        Profile {
            profiles: HashMap::new(),
        }
    }

    pub fn create_account(&mut self, user_id: String, params: UserProfileCreationInfo) -> Result<String, String> {
        // Validation
        // if params.params.name.is_none() || params.params.name.as_ref().unwrap().trim().is_empty() {
        //     return Err("Name is required".to_string());
        // }
        // if params.params.email.is_none() || params.params.email.as_ref().unwrap().trim().is_empty() {
        //     return Err("Email is required".to_string());
        // }
        // if params.params.age.is_none() {
        //     return Err("Age is required".to_string());
        // }
        // if params.params.min_preferred_age.is_none() {
        //     return Err("Minimum preferred age is required".to_string());
        // }
        // if params.params.max_preferred_age.is_none() {
        //     return Err("Maximum preferred age is required".to_string());
        // }
        // if params.params.location.is_none() || params.params.location.as_ref().unwrap().trim().is_empty() {
        //     return Err("Location is required".to_string());
        // }
        // if params.params.preferred_location.is_none() || params.params.preferred_location.as_ref().unwrap().trim().is_empty() {
        //     return Err("Preferred location is required".to_string());
        // }
        // if params.params.gender.is_none() || params.params.gender.as_ref().unwrap().trim().is_empty() {
        //     return Err("Gender is required".to_string());
        // }
        // if params.params.preferred_gender.is_none() || params.params.preferred_gender.as_ref().unwrap().trim().is_empty() {
        //     return Err("Preferred gender is required".to_string());
        // }

        ic_cdk::println!("profile {:?}", params.params);
        self.profiles.insert(user_id.clone(), params);
        Ok(format!("User profile created with id: {}", user_id))
        
    }

    pub fn get_account(&self, user_id: &String) -> Result<UserProfileCreationInfo, String> {
        match self.profiles.get(user_id) {
            Some(profile) => Ok(profile.clone()),
            None => Err("Account profile not found, do create one.".to_string()),
        }
    }

    pub fn update_account(&mut self, user_id: &String, new_params: UserProfileParams) -> Result<String, String> {
        match self.profiles.get_mut(user_id) {
            Some(profile) => {
                profile.params = profile.params.merge(new_params).clone();
                Ok(format!("User profile updated with id: {}", user_id))
            }
            None => Err("Account profile not found, please create one.".to_string()),
        }
    }

    pub fn delete_account(&mut self, user_id: &String) -> Result<String, String> {
        if self.profiles.remove(user_id).is_some() {
            Ok("User profile deleted.".to_string())
        } else {
            Err("Account profile not found, nothing to delete.".to_string())
        }
    }

    pub fn find_matched_profiles(&self, user_id: &String) -> Vec<String> {
        let mut matched_ids = Vec::new();

        // Retrieve the current user's profile using the provided user_id
        if let Some(current_profile) = self.profiles.get(user_id) {
            // Iterate over all profiles stored in the hashmap
            for (profile_id, profile_info) in &self.profiles {
                // Check all necessary conditions including unwrapping Option values safely
                if let (Some(age), Some(min_age), Some(max_age)) = (
                    profile_info.params.age,
                    current_profile.params.min_preferred_age,
                    current_profile.params.max_preferred_age
                ) {
                    // Ensure gender and location are not None and then compare their contained values
                    if age >= min_age && age <= max_age
                        && profile_info.params.gender.as_ref() == current_profile.params.preferred_gender.as_ref()
                        && profile_info.params.location.as_ref() == current_profile.params.preferred_location.as_ref()
                        && profile_id != user_id
                    {
                        matched_ids.push(profile_id.clone());
                    }
                }
            }
        }

        matched_ids
    }

}

impl UserProfileParams {
    pub fn merge(&mut self, other: UserProfileParams) -> &Self {
        if other.gender.is_some() {
            self.gender = other.gender;
        }
        if other.email.is_some() {
            self.email = other.email;
        }
        if other.name.is_some() {
            self.name = other.name;
        }
        if other.mobile_number.is_some() {
            self.mobile_number = other.mobile_number;
        }
        if other.dob.is_some() {
            self.dob = other.dob;
        }
        if other.gender_pronouns.is_some() {
            self.gender_pronouns = other.gender_pronouns;
        }
        if other.religion.is_some() {
            self.religion = other.religion;
        }
        if other.height.is_some() {
            self.height = other.height;
        }
        if other.zodiac.is_some() {
            self.zodiac = other.zodiac;
        }
        if other.diet.is_some() {
            self.diet = other.diet;
        }
        if other.occupation.is_some() {
            self.occupation = other.occupation;
        }
        if other.looking_for.is_some() {
            self.looking_for = other.looking_for;
        }
        if other.smoking.is_some() {
            self.smoking = other.smoking;
        }
        if other.drinking.is_some() {
            self.drinking = other.drinking;
        }
        if other.hobbies.is_some() {
            self.hobbies = other.hobbies;
        }
        if other.sports.is_some() {
            self.sports = other.sports;
        }
        if other.art_and_culture.is_some() {
            self.art_and_culture = other.art_and_culture;
        }
        if other.pets.is_some() {
            self.pets = other.pets;
        }
        if other.general_habits.is_some() {
            self.general_habits = other.general_habits;
        }
        if other.outdoor_activities.is_some() {
            self.outdoor_activities = other.outdoor_activities;
        }
        if other.travel.is_some() {
            self.travel = other.travel;
        }
        if other.movies.is_some() {
            self.movies = other.movies;
        }
        if other.interests_in.is_some() {
            self.interests_in = other.interests_in;
        }
        if other.age.is_some() {
            self.age = other.age;
        }
        if other.location.is_some() {
            self.location = other.location;
        }
        if other.min_preferred_age.is_some() {
            self.min_preferred_age = other.min_preferred_age;
        }
        if other.max_preferred_age.is_some() {
            self.max_preferred_age = other.max_preferred_age;
        }
        if other.preferred_gender.is_some() {
            self.preferred_gender = other.preferred_gender;
        }
        if other.preferred_location.is_some() {
            self.preferred_location = other.preferred_location;
        }
        if other.introduction.is_some() {
            self.introduction = other.introduction;
        }
        if other.images.is_some() {
            self.images = other.images;
        }
        self
    }
}

#[update]
pub async fn create_an_account(params: UserProfileParams) -> Result<String, String> {
    let caller = caller();

    let u_ids = raw_rand().await.unwrap().0;
    let unique_user_id = format!("{:x}", Sha256::digest(&u_ids));

    let profile_info = UserProfileCreationInfo {
        user_id: unique_user_id.clone(),
        created_at: time(),
        params: params.clone(),
        creator_principal: caller,
    };

    PROFILES.with(|profiles| profiles.borrow_mut().create_account(unique_user_id.clone(), profile_info))
}

#[update]
pub fn update_an_account(user_id: String, params: UserProfileParams) -> Result<String, String> {
    PROFILES.with(|profiles| profiles.borrow_mut().update_account(&user_id, params))
}

#[update]
pub fn delete_an_account(user_id: String) -> Result<String, String> {
    PROFILES.with(|profiles| profiles.borrow_mut().delete_account(&user_id))
}

#[query]
pub fn get_an_account(user_id: String) -> Result<UserProfileCreationInfo, String> {
    PROFILES.with(|profiles| profiles.borrow().get_account(&user_id))
}

#[query]
pub fn get_matched_profiles(user_id: String) -> Vec<String> {
    PROFILES.with(|profiles| profiles.borrow().find_matched_profiles(&user_id))
}