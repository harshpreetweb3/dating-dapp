use crate::user_profiles::UserProfile;
use ic_cdk::{export::candid::Principal, println};
use std::collections::HashMap;



pub fn find_matches(profiles: &HashMap<Principal, UserProfile>, new_profile: &UserProfile) -> Vec<Principal> {

    ic_cdk::println!("find_match fun is being called!!!");

    
    profiles.iter()
        .filter_map(|(id, existing_profile)| {
            if existing_profile.age >= new_profile.min_preferred_age &&
               existing_profile.age <= new_profile.max_preferred_age &&
               existing_profile.gender == new_profile.preferred_gender &&
               existing_profile.location == new_profile.preferred_location &&
               id != &new_profile.id {

                ic_cdk::println!("this id is matched by algo before putting in collections{}",id.clone());
                Some(id.clone())
                
            } else {
                None

            }
        })
        .collect()
}


// pub fn find_matches_for_existing_users() -> vec<Principal>{

// 
// }
// 



