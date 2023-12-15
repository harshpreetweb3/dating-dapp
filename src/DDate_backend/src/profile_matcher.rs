use crate::user_profiles::UserProfile;
use ic_cdk::{export::candid::Principal, println};
use std::collections::HashMap;



// pub fn find_matches(profiles: &HashMap<Principal, UserProfile>, new_profile: &UserProfile) -> Vec<Principal> {

//     ic_cdk::println!("find_match fun is being called!!!");

    
//     profiles.iter()
//         .filter_map(|(id, existing_profile)| {
//             if existing_profile.age >= new_profile.min_preferred_age &&
//                existing_profile.age <= new_profile.max_preferred_age &&
//                existing_profile.gender == new_profile.preferred_gender &&
//                existing_profile.location == new_profile.preferred_location &&
//                id != &new_profile.id {

//                 ic_cdk::println!("this id is matched by algo before putting in collections{}",id.clone());
//                 Some(id.clone())
                
//             } else {
//                 None

//             }
//         })
//         .collect()
// }

// Function to find and store matches in the user profile
// pub fn find_matches(
//     profiles: &mut HashMap<Principal, UserProfile>, 
//     new_profile: &mut UserProfile
// ) -> Vec<Principal>  {
//     let matched_principals: Vec<Principal> = profiles.iter()
//         .filter_map(|(id, existing_profile)| {
//             if existing_profile.age >= new_profile.min_preferred_age &&
//                existing_profile.age <= new_profile.max_preferred_age &&
//                existing_profile.gender == new_profile.preferred_gender &&
//                existing_profile.location == new_profile.preferred_location &&
//                id != &new_profile.id {

//                 println!("Match found: {}", id);
//                 Some(*id)
//             } else {
//                 None
//             }
//         })
//         .collect();

//     // Store the matched principals in the user profile
//     new_profile.matched_profiles = matched_principals.clone();

//     matched_principals
// }

// Function to find matches and return them, also stores them in the user profile
// pub fn find_matches(
//     profiles: &mut HashMap<Principal, UserProfile>, 
//     new_profile: &mut UserProfile
// ) -> Vec<Principal> {
//     let matched_principals: Vec<Principal> = profiles.iter()
//         .filter_map(|(id, existing_profile)| {
//             if existing_profile.age >= new_profile.min_preferred_age &&
//                existing_profile.age <= new_profile.max_preferred_age &&
//                existing_profile.gender == new_profile.preferred_gender &&
//                existing_profile.location == new_profile.preferred_location &&
//                id != &new_profile.id {

//                 println!("Match found: {}", id);
//                 Some(*id)
//             } else {
//                 None
//             }
//         })
//         .collect();

//     // Store the matched principals in the user profile
//     new_profile.matched_profiles = matched_principals.clone();

//     matched_principals
// }


// // pub fn find_matches_for_existing_users() -> vec<Principal>{

// // 
// // }
// // 





// Revised function

// pub fn find_matches<'a>(
//     user_profiles: impl Iterator<Item = (&'a Principal, &'a UserProfile)> + 'a, 
//     new_profile: &mut UserProfile
// ) -> Vec<Principal> {
//     user_profiles
//         .filter_map(|(id, existing_profile)| {
//             if existing_profile.age >= new_profile.min_preferred_age &&
//                existing_profile.age <= new_profile.max_preferred_age &&
//                existing_profile.gender == new_profile.preferred_gender &&
//                existing_profile.location == new_profile.preferred_location &&
//                id != &new_profile.id {

//                 println!("Match found: {}", id);
//                 Some(*id)
//             } else {
//                 None
//             }
//         })
//         .collect()
// }


pub fn find_matches(
    profiles: &HashMap<Principal, UserProfile>,
    profile_id: &Principal
) -> Vec<Principal> {
    let new_profile = profiles.get(profile_id)
        .expect("Profile not found");

    profiles.iter()
        .filter_map(|(id, existing_profile)| {
            if existing_profile.age >= new_profile.min_preferred_age &&
               existing_profile.age <= new_profile.max_preferred_age &&
               existing_profile.gender == new_profile.preferred_gender &&
               existing_profile.location == new_profile.preferred_location &&
               id != profile_id {

                Some(*id)
            } else {
                None
            }
        })
        .collect()
}