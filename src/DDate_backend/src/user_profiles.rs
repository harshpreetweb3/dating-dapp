use crate::{UpdateUserProfileParams, UserProfileParams};
use bincode;
use candid::{CandidType, Principal};
//use ic_cdk::api::caller;
use ic_cdk::api::stable::{StableReader, StableWriter};
use ic_cdk_macros::{post_upgrade, pre_upgrade, update};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::{HashMap, HashSet, VecDeque};
use std::io::Read;

#[pre_upgrade]
fn pre_upgrade() {
    // Serialize and write data to stable storage
    USER_PROFILES.with(|profiles| {
        let serialized = bincode::serialize(&*profiles.borrow()).expect("Serialization failed");
        let mut writer = StableWriter::default();
        writer
            .write(&serialized)
            .expect("Failed to write to stable storage");
    });
    ic_cdk::println!("pre upgrade is implemented");
}

#[post_upgrade]
fn post_upgrade() {
    // Read and deserialize data from stable storage
    let mut reader = StableReader::default();
    let mut data = Vec::new();
    reader
        .read_to_end(&mut data)
        .expect("Failed to read from stable storage");
    let profiles: UserProfiles = bincode::deserialize(&data).expect("Deserialization failed");
    // Restore data
    USER_PROFILES.with(|p| {
        *p.borrow_mut() = profiles;
    });
    ic_cdk::println!("post upgrade is implemented");
}

#[derive(Serialize, Deserialize, Clone, Debug, CandidType)]
pub struct UserProfile {
    pub id: Principal,
    pub gender: String,
    pub email: String,
    pub name: String,
    pub mobile_number: String,
    pub dob: String,
    pub gender_pronouns: String,
    pub religion: String,
    pub height: String,
    pub zodiac: String,
    pub diet: String,
    pub occupation: String,
    pub looking_for: String,
    pub smoking: String,
    pub drinking: String,
    pub hobbies: Vec<String>,
    pub sports: Vec<String>,
    pub art_and_culture: Vec<String>,
    pub pets: String,
    pub general_habits: Vec<String>,
    pub outdoor_activities: Vec<String>,
    pub travel: Vec<String>,
    pub movies: Vec<String>,
    pub interests_in: String,
    pub age: u64,
    pub location: String, // missing
    pub min_preferred_age: u64,
    pub max_preferred_age: u64,
    pub preferred_gender: String,   // hai
    pub preferred_location: String, // missing
    //pub matched: bool,
    pub introduction: String,
    pub likes: HashSet<Principal>, // Add this to store likes
    //pub matches: HashSet<Principal>,
    pub matches: Vec<Principal>,
    pub notifications: VecDeque<Notification>,
    pub images: Vec<String>,
    pub matched_profiles: Vec<Principal>,
}

// Define the Notification struct
#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Notification {
    pub sender_id: Principal,
    pub receiver_id: Principal,
    pub notification_type: NotificationType,
    // Additional fields as needed
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub enum NotificationType {
    Like,
    // Add other notification types as needed
}

#[derive(Serialize, Deserialize)]
pub struct UserProfiles {
    pub profiles: HashMap<Principal, UserProfile>,
}

// Wrap UserProfiles in a RefCell for interior mutability
thread_local! {
    pub static USER_PROFILES: RefCell<UserProfiles> = RefCell::new(UserProfiles::new());
}

impl UserProfiles {
    // Initialize
    pub fn new() -> Self {
        UserProfiles {
            profiles: HashMap::new(),
        }
    }

    // Create profile
    pub fn create_profile(&mut self, params: UserProfileParams) {
        let profile = UserProfile {
            id: params.id.clone(),
            name: params.name.clone(),  
            age: params.age,
            gender: params.gender.clone(),
            email: params.email.clone(),
            mobile_number: params.mobile_number.clone(),
            dob: params.dob.clone(),
            gender_pronouns: params.gender_pronouns.clone(),
            religion: params.religion.clone(),
            height: params.height.clone(),
            zodiac: params.zodiac.clone(),
            diet: params.diet.clone(),
            occupation: params.occupation.clone(),
            looking_for: params.looking_for.clone(),
            smoking: params.smoking.clone(),
            drinking: params.drinking.clone(),
            hobbies: params.hobbies.clone(),
            sports: params.sports.clone(),
            art_and_culture: params.art_and_culture.clone(),
            pets: params.pets.clone(),
            general_habits: params.general_habits.clone(),
            outdoor_activities: params.outdoor_activities.clone(),
            travel: params.travel.clone(),
            movies: params.movies.clone(),
            interests_in: params.interests_in.clone(),
            location: params.location.clone(),
            min_preferred_age: params.min_preferred_age,
            max_preferred_age: params.max_preferred_age,
            preferred_gender: params.preferred_gender.clone(),
            preferred_location: params.preferred_location.clone(),
            introduction: params.introduction.clone(),
            likes: HashSet::new(),
            matches: Vec::new(),
            notifications: VecDeque::new(),
            images: params.images.clone(),
            matched_profiles: Vec::new(),
        };
        ic_cdk::println!("Profile created for user: {}", profile.name);
        self.profiles.insert(profile.id.clone(), profile);
    }

    // pub fn get_mut_profile(&mut self, id: &Principal) -> Option<&mut UserProfile> {
    //     self.profiles.get_mut(id)
    // }

    pub fn get_profile(&self, id: &Principal) -> Option<&UserProfile> {
        self.profiles.get(id)
    }

    // Function to delete a user profile
    pub fn delete_profile(&mut self, id: Principal) {
        self.profiles.remove(&id);
        ic_cdk::println!("Profile is deleted successfully");
    }

    pub fn update_profile(&mut self, params: UpdateUserProfileParams) {
        if let Some(profile) = self.profiles.get_mut(&params.id) {
            if let Some(name) = params.new_name {
                profile.name = name;
            }
            if let Some(email) = params.new_email {
                profile.email = email;
            }
            if let Some(mobile_number) = params.new_mobile_number {
                profile.mobile_number = mobile_number;
            }
            if let Some(dob) = params.new_dob {
                profile.dob = dob;
            }
            if let Some(gender_pronouns) = params.new_gender_pronouns {
                profile.gender_pronouns = gender_pronouns;
            }
            if let Some(religion) = params.new_religion {
                profile.religion = religion;
            }
            if let Some(height) = params.new_height {
                profile.height = height;
            }
            if let Some(zodiac) = params.new_zodiac {
                profile.zodiac = zodiac;
            }
            if let Some(diet) = params.new_diet {
                profile.diet = diet;
            }
            if let Some(occupation) = params.new_occupation {
                profile.occupation = occupation;
            }
            if let Some(looking_for) = params.new_looking_for {
                profile.looking_for = looking_for;
            }
            if let Some(smoking) = params.new_smoking {
                profile.smoking = smoking;
            }
            if let Some(drinking) = params.new_drinking {
                profile.drinking = drinking;
            }
            if let Some(hobbies) = params.new_hobbies {
                profile.hobbies = hobbies;
            }
            if let Some(sports) = params.new_sports {
                profile.sports = sports;
            }
            if let Some(art_and_culture) = params.new_art_and_culture {
                profile.art_and_culture = art_and_culture;
            }
            if let Some(pets) = params.new_pets {
                profile.pets = pets;
            }
            if let Some(general_habits) = params.new_general_habits {
                profile.general_habits = general_habits;
            }
            if let Some(outdoor_activities) = params.new_outdoor_activities {
                profile.outdoor_activities = outdoor_activities;
            }
            if let Some(travel) = params.new_travel {
                profile.travel = travel;
            }
            if let Some(movies) = params.new_movies {
                profile.movies = movies;
            }
            if let Some(interests_in) = params.new_interests_in {
                profile.interests_in = interests_in;
            }
            if let Some(age) = params.new_age {
                profile.age = age;
            }
            if let Some(location) = params.new_location {
                profile.location = location;
            }
            if let Some(min_preferred_age) = params.new_min_preferred_age {
                profile.min_preferred_age = min_preferred_age;
            }
            if let Some(max_preferred_age) = params.new_max_preferred_age {
                profile.max_preferred_age = max_preferred_age;
            }
            if let Some(preferred_gender) = params.new_preferred_gender {
                profile.preferred_gender = preferred_gender;
            }
            if let Some(preferred_location) = params.new_preferred_location {
                profile.preferred_location = preferred_location;
            }
            // if let Some(matched) = params.new_matched {
            //     profile.matched = matched;
            // }
            if let Some(gender) = params.new_gender {
                profile.gender = gender;
            }

            if let Some(introduction) = params.new_introduction {
                profile.introduction = introduction;
            }

            if let Some(images) = params.images {
                profile.images = images;
            }

            if let Some(matches) = params.matches {
                profile.matches = matches;
            }

            ic_cdk::println!("Profile for {} updated successfully.", params.id);
        } else {
            ic_cdk::println!("No profile found for ID: {}", params.id);
        }
    }
}

pub fn create_kro_profile(params: UserProfileParams) {
    //let profile_id = params.id.clone();

    USER_PROFILES.with(|profiles| {
        let mut profiles = profiles.borrow_mut();

        profiles.create_profile(params);
        let profile_count = profiles.profiles.len();
        ic_cdk::println!("Number of user profiles: {}", profile_count);

        if profile_count == 0 {
            ic_cdk::println!("No user profiles found.");
        }

        for (id, profile) in profiles.profiles.iter() {
            ic_cdk::println!("Username: {}, Age: {}", id, profile.age);
        }
    });
}

pub fn get_kro_profile(id: Principal) -> Option<UserProfile> {
    USER_PROFILES.with(|profiles| profiles.borrow().get_profile(&id).cloned())
}

// Public function to delete a user profile
#[update]
pub fn delete_kro_profile(id: Principal) {
    USER_PROFILES.with(|profiles| {
        profiles.borrow_mut().delete_profile(id);
    });
}

#[update]
pub fn update_kro_profile(params: UpdateUserProfileParams) {
    USER_PROFILES.with(|profiles| {
        profiles.borrow_mut().update_profile(params);
    });
}

// MOCK DATA..................



#[cfg(test)]
mod tests {
    use super::*;
    // ... (include other necessary imports)

    fn mock_user_profile_params() -> UserProfileParams {
        UserProfileParams {
            id: Principal::anonymous(),
            gender: "Male".to_string(),
            email: "test@example.com".to_string(),
            name: "John Doe".to_string(),
            mobile_number: "1234567890".to_string(),
            dob: "1990-01-01".to_string(),
            gender_pronouns: "He/Him".to_string(),
            religion: "None".to_string(),
            height: "180cm".to_string(),
            zodiac: "Aquarius".to_string(),
            diet: "Vegetarian".to_string(),
            occupation: "Engineer".to_string(),
            looking_for: "Friendship".to_string(),
            smoking: "No".to_string(),
            drinking: "Occasionally".to_string(),
            hobbies: vec!["Reading".to_string(), "Gaming".to_string()],
            sports: vec!["Football".to_string()],
            art_and_culture: vec!["Painting".to_string()],
            pets: "Dog".to_string(),
            general_habits: vec!["Early Riser".to_string()],
            outdoor_activities: vec!["Hiking".to_string()],
            travel: vec!["Japan".to_string()],
            movies: vec!["Inception".to_string()],
            interests_in: "Technology".to_string(),
            age: 30,
            location: "New York".to_string(),
            min_preferred_age: 25,
            max_preferred_age: 35,
            preferred_gender: "Female".to_string(),
            preferred_location: "New York".to_string(),
            introduction: "Introvert, tech enthusiast".to_string(),
            images: vec!["image1.png".to_string()],
        }
    }

    #[test]
    fn test_create_profile() {
        let test_params = mock_user_profile_params();

        // Assuming create_kro_profile is your function to create a profile
        create_kro_profile(test_params.clone());

        USER_PROFILES.with(|profiles| {
            let profiles = profiles.borrow();
            assert!(profiles.profiles.contains_key(&test_params.id));
        });
    }

    #[test]
    fn test_delete_profile() {
        let test_params = mock_user_profile_params();
        create_kro_profile(test_params.clone());

        // Assuming delete_kro_profile is your function to delete a profile
        delete_kro_profile(test_params.id.clone());

        USER_PROFILES.with(|profiles| {
            let profiles = profiles.borrow();
            assert!(!profiles.profiles.contains_key(&test_params.id));
        });
    }

    #[test]
    fn test_update_profile() {
        let test_params = mock_user_profile_params();
        create_kro_profile(test_params.clone());

        let update_params = UpdateUserProfileParams {
            id: test_params.id.clone(),
            new_name: Some("Jane Doe".to_string()),
            new_email: Some("jane.doe@example.com".to_string()),
            new_mobile_number: Some("9876543210".to_string()),
            new_dob: Some("1990-02-15".to_string()),
            new_gender_pronouns: Some("She/Her".to_string()),
            new_religion: Some("Agnostic".to_string()),
            new_height: Some("170cm".to_string()),
            new_zodiac: Some("Pisces".to_string()),
            new_diet: Some("Vegan".to_string()),
            new_occupation: Some("Designer".to_string()),
            new_looking_for: Some("Relationship".to_string()),
            new_smoking: Some("Yes".to_string()),
            new_drinking: Some("Never".to_string()),
            new_hobbies: Some(vec!["Photography".to_string(), "Traveling".to_string()]),
            new_sports: Some(vec!["Tennis".to_string()]),
            new_art_and_culture: Some(vec!["Music".to_string(), "Theatre".to_string()]),
            new_pets: Some("Cat".to_string()),
            new_general_habits: Some(vec!["Night Owl".to_string()]),
            new_outdoor_activities: Some(vec!["Cycling".to_string()]),
            new_travel: Some(vec!["France".to_string()]),
            new_movies: Some(vec!["The Matrix".to_string()]),
            new_interests_in: Some("Artificial Intelligence".to_string()),
            new_age: Some(34),
            new_location: Some("San Francisco".to_string()),
            new_min_preferred_age: Some(28),
            new_max_preferred_age: Some(40),
            new_preferred_gender: Some("Male".to_string()),
            new_preferred_location: Some("Los Angeles".to_string()),
            new_matched: Some(false),
            new_introduction: Some("Creative and adventurous".to_string()),
            images: Some(vec!["image2.png".to_string()]),
            new_gender: Some("Female".to_string()),
            matches: Some(vec![Principal::anonymous()]), // Replace with appropriate Principal values
        };

        update_kro_profile(update_params.clone());

        USER_PROFILES.with(|profiles| {
            let profiles = profiles.borrow();
            let updated_profile = profiles.profiles.get(&test_params.id).unwrap();

            assert_eq!(updated_profile.name, update_params.new_name.unwrap());
            assert_eq!(updated_profile.email, update_params.new_email.unwrap());
            assert_eq!(
                updated_profile.mobile_number,
                update_params.new_mobile_number.unwrap()
            );
            assert_eq!(updated_profile.dob, update_params.new_dob.unwrap());
            assert_eq!(
                updated_profile.gender_pronouns,
                update_params.new_gender_pronouns.unwrap()
            );
            assert_eq!(
                updated_profile.religion,
                update_params.new_religion.unwrap()
            );
            assert_eq!(updated_profile.height, update_params.new_height.unwrap());
            assert_eq!(updated_profile.zodiac, update_params.new_zodiac.unwrap());
            assert_eq!(updated_profile.diet, update_params.new_diet.unwrap());
            assert_eq!(
                updated_profile.occupation,
                update_params.new_occupation.unwrap()
            );
            assert_eq!(
                updated_profile.looking_for,
                update_params.new_looking_for.unwrap()
            );
            assert_eq!(updated_profile.smoking, update_params.new_smoking.unwrap());
            assert_eq!(
                updated_profile.drinking,
                update_params.new_drinking.unwrap()
            );
            assert_eq!(updated_profile.hobbies, update_params.new_hobbies.unwrap());
            assert_eq!(updated_profile.sports, update_params.new_sports.unwrap());
            assert_eq!(
                updated_profile.art_and_culture,
                update_params.new_art_and_culture.unwrap()
            );
            assert_eq!(updated_profile.pets, update_params.new_pets.unwrap());
            assert_eq!(
                updated_profile.general_habits,
                update_params.new_general_habits.unwrap()
            );
            assert_eq!(
                updated_profile.outdoor_activities,
                update_params.new_outdoor_activities.unwrap()
            );
            assert_eq!(updated_profile.travel, update_params.new_travel.unwrap());
            assert_eq!(updated_profile.movies, update_params.new_movies.unwrap());
            assert_eq!(
                updated_profile.interests_in,
                update_params.new_interests_in.unwrap()
            );
            assert_eq!(updated_profile.age, update_params.new_age.unwrap());
            assert_eq!(
                updated_profile.location,
                update_params.new_location.unwrap()
            );
            assert_eq!(
                updated_profile.min_preferred_age,
                update_params.new_min_preferred_age.unwrap()
            );
            assert_eq!(
                updated_profile.max_preferred_age,
                update_params.new_max_preferred_age.unwrap()
            );
            assert_eq!(
                updated_profile.preferred_gender,
                update_params.new_preferred_gender.unwrap()
            );
            assert_eq!(
                updated_profile.preferred_location,
                update_params.new_preferred_location.unwrap()
            );
            assert_eq!(
                updated_profile.introduction,
                update_params.new_introduction.unwrap()
            );
            assert_eq!(updated_profile.images, update_params.images.unwrap());
            assert_eq!(updated_profile.gender, update_params.new_gender.unwrap());
            // Add any additional assertions for fields that were updated
        });
    }

    #[test]
    fn test_get_kro_profile() {
        let test_params = mock_user_profile_params();

        // First, create a profile to retrieve later
        create_kro_profile(test_params.clone());

        // Now, retrieve the profile
        let retrieved_profile = get_kro_profile(test_params.id.clone());

        // Check that the retrieved profile matches the one we created
        assert!(retrieved_profile.is_some());
        let retrieved_profile = retrieved_profile.unwrap();
        assert_eq!(retrieved_profile.id, test_params.id);
        assert_eq!(retrieved_profile.name, test_params.name);
        // ... (continue asserting other fields)

        // Additionally, test retrieving a non-existing profile
        // let non_existing_id = Principal::anonymous(); // or any other non-existing ID
        // assert!(get_kro_profile(non_existing_id).is_none());
    }
}
