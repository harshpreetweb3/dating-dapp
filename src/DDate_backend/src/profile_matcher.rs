use crate::user_profiles::UserProfile;
use ic_cdk::export::candid::Principal;
use std::collections::HashMap;


pub fn find_matches_for_user(
    profiles: &HashMap<Principal, UserProfile>,
    profile_id: &Principal,
) -> Vec<Principal> {
    ic_cdk::println!("wait find match function is being calles");

    let new_profile = profiles.get(profile_id).expect("Profile not found");

    profiles
        .iter()
        .filter_map(|(id, existing_profile)| {
            if existing_profile.age >= new_profile.min_preferred_age
                && existing_profile.age <= new_profile.max_preferred_age
                && existing_profile.gender == new_profile.preferred_gender
                && existing_profile.location == new_profile.preferred_location
                && id != profile_id
            {
                ic_cdk::println!("Match found: {:?}", id);
                Some(*id)
            } else {
                None
            }  
        })
        .collect()
}



#[cfg(test)]
mod tests {
    use super::*;
    use crate::user_profiles::UserProfile;
    use ic_cdk::export::candid::Principal;
    use std::collections::{HashMap, HashSet, VecDeque};

    // Mock profile creation function
    fn create_mock_profile(
        id: Principal,
        age: u64,
        gender: &str,
        location: &str,
        min_preferred_age: u64,
        max_preferred_age: u64,
        preferred_gender: &str,
        preferred_location: &str
    ) -> UserProfile {
        UserProfile {
            id,
            age,
            gender: gender.to_string(),
            location: location.to_string(),
            min_preferred_age,
            max_preferred_age,
            preferred_gender: preferred_gender.to_string(),
            preferred_location: preferred_location.to_string(),
    
            // Initialize other fields with mock or default values
            email: "test@example.com".to_string(),
            name: "Test User".to_string(),
            mobile_number: "1234567890".to_string(),
            dob: "1990-01-01".to_string(),
            gender_pronouns: "They/Them".to_string(),
            religion: "None".to_string(),
            height: "170 cm".to_string(),
            zodiac: "Aries".to_string(),
            diet: "Vegetarian".to_string(),
            occupation: "Developer".to_string(),
            looking_for: "Friendship".to_string(),
            smoking: "No".to_string(),
            drinking: "Occasionally".to_string(),
            hobbies: vec!["Reading", "Gaming"].iter().map(|&s| s.into()).collect(),
            sports: vec!["Football", "Basketball"].iter().map(|&s| s.into()).collect(),
            art_and_culture: vec!["Painting", "Music"].iter().map(|&s| s.into()).collect(),
            pets: "Dog".to_string(),
            general_habits: vec!["Early Riser", "Night Owl"].iter().map(|&s| s.into()).collect(),
            outdoor_activities: vec!["Hiking", "Biking"].iter().map(|&s| s.into()).collect(),
            travel: vec!["Japan", "Italy"].iter().map(|&s| s.into()).collect(),
            movies: vec!["Inception", "The Matrix"].iter().map(|&s| s.into()).collect(),
            interests_in: "Technology".to_string(),
            introduction: "Introverted tech enthusiast".to_string(),
            images: vec!["image1.png", "image2.png"].iter().map(|&s| s.into()).collect(),
            likes: HashSet::new(), // Empty set of likes
            matches: Vec::new(), // Empty list of matches
            notifications: VecDeque::new(), // Empty notifications
            matched_profiles: Vec::new(), // Empty matched profiles
        }
    }

    #[test]
    fn test_find_matches() {
        // Set up a HashMap to simulate USER_PROFILES
        let mut profiles = HashMap::new();

        // Create and insert mock profiles
        let target_profile_id = Principal::from_text("cb53b-qsf7f-isr4v-tco56-pu475-66ehq-cfkko-doax3-xrnjh-pdo57-zae").unwrap();
        let matching_profile_id = Principal::from_text("fhzp2-mb4kr-hm4io-32js7-oketg-gdi73-4pqb4-6jyxp-ajbhd-tuiwt-bqe").unwrap();
        let non_matching_profile_id = Principal::from_text("5oynr-yl472-mav57-c2oxo-g7woc-yytib-mp5bo-kzg3b-622pu-uatef-uqe").unwrap();

        let target_profile = create_mock_profile(target_profile_id, 30, "Female", "New York", 25, 35, "Male", "New York");
        let matching_profile = create_mock_profile(matching_profile_id, 31, "Male", "New York", 26, 36, "Female", "New York");
        let non_matching_profile = create_mock_profile(non_matching_profile_id, 40, "Female", "Los Angeles", 35, 45, "Male", "Los Angeles");

        profiles.insert(target_profile_id, target_profile);
        profiles.insert(matching_profile_id, matching_profile);
        profiles.insert(non_matching_profile_id, non_matching_profile);

        // Call find_matches
        let matched_principals = find_matches(&profiles, &target_profile_id);

        // Assertions
        assert!(matched_principals.contains(&matching_profile_id));
        assert!(!matched_principals.contains(&non_matching_profile_id));
    }
}




// fn create_mock_profile(
//     id: Principal,
//     age: u64,
//     gender: &str,
//     location: &str,
//     min_preferred_age: u64,
//     max_preferred_age: u64,
//     preferred_gender: &str,
//     preferred_location: &str
// ) -> UserProfile {
//     UserProfile {
//         id,
//         age,
//         gender: gender.to_string(),
//         location: location.to_string(),
//         min_preferred_age,
//         max_preferred_age,
//         preferred_gender: preferred_gender.to_string(),
//         preferred_location: preferred_location.to_string(),

//         // Mock or default values for other fields
//         email: "test@example.com".to_string(),
//         name: "Test User".to_string(),
//         mobile_number: "1234567890".to_string(),
//         dob: "1990-01-01".to_string(),
//         gender_pronouns: "They/Them".to_string(),
//         religion: "None".to_string(),
//         height: "170 cm".to_string(),
//         zodiac: "Aries".to_string(),
//         diet: "Vegetarian".to_string(),
//         occupation: "Developer".to_string(),
//         looking_for: "Friendship".to_string(),
//         smoking: "No".to_string(),
//         drinking: "Occasionally".to_string(),
//         hobbies: vec!["Reading", "Gaming"].iter().map(|&s| s.into()).collect(),
//         sports: vec!["Football", "Basketball"].iter().map(|&s| s.into()).collect(),
//         art_and_culture: vec!["Painting", "Music"].iter().map(|&s| s.into()).collect(),
//         pets: "Dog".to_string(),
//         general_habits: vec!["Early Riser", "Night Owl"].iter().map(|&s| s.into()).collect(),
//         outdoor_activities: vec!["Hiking", "Biking"].iter().map(|&s| s.into()).collect(),
//         travel: vec!["Japan", "Italy"].iter().map(|&s| s.into()).collect(),
//         movies: vec!["Inception", "The Matrix"].iter().map(|&s| s.into()).collect(),
//         interests_in: "Technology".to_string(),
//         introduction: "Introverted tech enthusiast".to_string(),
//         images: vec!["image1.png", "image2.png"].iter().map(|&s| s.into()).collect(),
//         likes: HashSet::new(), // Empty set of likes
//         matches: Vec::new(), // Empty list of matches
//         notifications: VecDeque::new(), // Empty notifications
//         matched_profiles: Vec::new(), // Empty matched profiles
//     }
// }

// #[cfg(test)]
// mod tests {

// #[test]
// fn test_find_matches_for_me() {
//     let target_profile_id = Principal::anonymous(); // Replace with a specific Principal
//     let target_profile = create_mock_profile(target_profile_id, 30, "Female", "New York", 25, 35, "Male", "New York");

//     let matching_profile_id = Principal::anonymous(); // Replace with a different Principal
//     let matching_profile = create_mock_profile(matching_profile_id, 31, "Male", "New York", 26, 36, "Female", "New York");

//     let non_matching_profile_id = Principal::anonymous(); // Replace with a different Principal
//     let non_matching_profile = create_mock_profile(non_matching_profile_id, 40, "Female", "Los Angeles", 35, 45, "Male", "Los Angeles");

//     println!("Target Profile: {:?}", target_profile);
//     USER_PROFILES.with(|profiles| {
//         profiles.borrow_mut().profiles.insert(target_profile_id, target_profile);
//         profiles.borrow_mut().profiles.insert(matching_profile_id, matching_profile);
//         profiles.borrow_mut().profiles.insert(non_matching_profile_id, non_matching_profile);
//     });

//     find_matches_for_me(target_profile_id);
    


//     USER_PROFILES.with(|profiles| {
//         let profiles = profiles.borrow();
//         let user_profile = profiles.profiles.get(&target_profile_id).unwrap();

//         assert!(user_profile.matched_profiles.contains(&matching_profile_id));

//         assert!(!user_profile.matched_profiles.contains(&non_matching_profile_id));
//     });
// }
// }

