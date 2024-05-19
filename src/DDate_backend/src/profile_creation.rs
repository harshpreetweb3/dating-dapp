use ic_cdk::api::{caller, management_canister::main::raw_rand, time};
use ic_cdk::{query, update};
use sha2::{Digest, Sha256};
use std::{cell::RefCell, collections::HashMap};

use candid::{CandidType, Principal};
use serde::Deserialize;

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct UserProfileParams {
    gender: Option<String>,
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
}

thread_local! {
    pub static PROFILES : RefCell<Profile> = RefCell::new(Profile::new())
}

pub struct Profile {
    pub profiles: HashMap<Principal, UserProfileCreationInfo>,
}

impl Profile {
    pub fn new() -> Self {
        Profile {
            profiles: HashMap::new(),
        }
    }

    pub fn create_account(&mut self, caller: Principal, params: UserProfileCreationInfo) -> String {
        ic_cdk::println!("profile {:?}", params.params);
        self.profiles.insert(caller, params.clone());
        format!("User profile created with id : {}", params.user_id.clone())
    }

    // pub fn get_account() -> Result<UserProfileParams, String> {
    //     let caller = caller();
    //     PROFILES.with(|profiles| {
    //         let profiles = profiles.borrow().profiles.get(&caller).cloned();
    //         let result = match profiles {
    //             Some(profiles) => profiles,
    //             None => return Err("account profile is not found, do create one".to_string()),
    //         };
    //         Ok(result)
    //     })
    // }

    pub fn get_account(&self, caller: Principal) -> Result<UserProfileCreationInfo, String> {
        let open = self.profiles.get(&caller).cloned();

        let result = match open {
            Some(profile) => profile,
            None => return Err("account profile is not found, do create one".to_string()),
        };
        ic_cdk::println!("got this result {:?}", result);
        Ok(result)

    }
}

#[update]
pub async fn create_an_account(params: UserProfileParams) -> String {
    let caller = caller();

    let u_ids = raw_rand().await.unwrap().0;
    let unique_user_id = format!("{:x}", Sha256::digest(&u_ids));

    let profile_info = UserProfileCreationInfo {
        user_id: unique_user_id,
        created_at: time(),
        params: params.clone(),
    };

    PROFILES.with(|profiles| profiles.borrow_mut().create_account(caller, profile_info))
}

#[query]
pub fn get_an_account() -> Result<UserProfileCreationInfo, String> {
    let caller = caller();
    PROFILES.with(|profiles| profiles.borrow().get_account(caller))
}

