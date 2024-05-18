// use crate::CandidType;

use std::{cell::RefCell, collections::HashMap};

use ic_cdk::api::caller;
use ic_cdk::{query, update};


use candid::{CandidType, Principal};
use serde::Deserialize;

#[derive(Clone, Deserialize, CandidType)]
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

thread_local! {
    pub static PROFILES : RefCell<Profile> = RefCell::new(Profile::new())
}

pub struct Profile {
    pub profiles : HashMap<Principal, UserProfileParams>
} 

impl Profile{

    pub fn new() -> Self{

        Profile {
            profiles : HashMap::new()
        }

    }

    pub fn create_account(params : UserProfileParams) -> String{

        let caller  = caller();
        PROFILES.with(|profiles|{
            let mut profiles = profiles.borrow_mut();
            profiles.profiles.insert(caller, params);
            format!("user profile is created !")
        }) 

    }

    pub fn get_account() -> Result<UserProfileParams, String>{

        let caller = caller();
        PROFILES.with(|profiles|{
            let profiles = profiles.borrow().profiles.get(&caller).cloned();
            let result = match profiles{
                Some(profiles) => {
                    profiles
                },
                None => return Err("account profile is not found, do create one".to_string())
            };
            Ok(result)
        })

    }

}

#[update]
pub fn create_an_account(params : UserProfileParams) -> String{
        Profile::create_account(params)
}


#[query]
pub fn get_an_account() -> Result<UserProfileParams, String>{
    Profile::get_account()
}