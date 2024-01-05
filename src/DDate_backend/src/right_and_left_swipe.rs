use crate::notification::send_like_notification;
use crate::user_profiles::UserProfile; // Import UserProfile
use ic_cdk::export::candid::Principal;
use std::collections::HashMap;

pub fn like_profile(
    profiles: &mut HashMap<Principal, UserProfile>,
    current_user_id: Principal,
    liked_user_id: Principal,
) {
    if let Some(user_profile) = profiles.get_mut(&current_user_id) {
        user_profile.likes.insert(liked_user_id);
        ic_cdk::println!("liked!");
        //send_like_notification(current_user_id, liked_user_id);
        match send_like_notification(profiles, current_user_id, liked_user_id) {
            Ok(()) => println!("Notification sent successfully"),
            Err(e) => println!("Error sending notification: {}", e),
        }
    }
}

pub fn check_for_match(
    profiles: &mut HashMap<Principal, UserProfile>,
    current_user_id: Principal,
    liked_user_id: Principal,
) -> bool {
    like_profile(profiles, current_user_id, liked_user_id);

    if let Some(liked_user_profile) = profiles.get(&liked_user_id) {
        if liked_user_profile.likes.contains(&current_user_id) {
            ic_cdk::println!(
                "matching has been done between {} and {}",
                current_user_id,
                liked_user_id
            );
            return true;
        }
    }
    ic_cdk::println!("matched is not made");
    false
}


#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::{HashMap, HashSet, VecDeque};
    

    // Helper function to create a mock user profile
    fn create_mock_user_profile(id: Principal) -> UserProfile {
        UserProfile {
            id,
            gender: "Male".to_string(),
            email: "user@example.com".to_string(),
            name: "John Doe".to_string(),
            mobile_number: "1234567890".to_string(),
            dob: "1990-01-01".to_string(),
            gender_pronouns: "He/Him".to_string(),
            religion: "None".to_string(),
            height: "180cm".to_string(),
            zodiac: "Aries".to_string(),
            diet: "Omnivore".to_string(),
            occupation: "Developer".to_string(),
            looking_for: "Friendship".to_string(),
            smoking: "No".to_string(),
            drinking: "Socially".to_string(),
            hobbies: vec!["Reading".to_string(), "Coding".to_string()],
            sports: vec!["Soccer".to_string()],
            art_and_culture: vec!["Cinema".to_string()],
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
            introduction: "Enthusiastic tech lover and avid reader".to_string(),
            likes: HashSet::new(), // Empty set of likes
            matches: Vec::new(), // Empty list of matches
            notifications: VecDeque::new(), // Empty notifications
            images: vec!["image1.jpg".to_string()],
            matched_profiles: Vec::new(), // Empty matched profiles
        }
    }
    

    #[test]
    fn test_like_profile() {
        let mut profiles = HashMap::new();
        let current_user_id = Principal::anonymous(); // Replace with a specific Principal
        let liked_user_id = Principal::anonymous(); // Replace with a different Principal

        profiles.insert(current_user_id, create_mock_user_profile(current_user_id));
        profiles.insert(liked_user_id, create_mock_user_profile(liked_user_id));

        like_profile(&mut profiles, current_user_id, liked_user_id);

        assert!(profiles.get(&current_user_id).unwrap().likes.contains(&liked_user_id));
    }

    #[test]
    fn test_check_for_match() {
        let mut profiles = HashMap::new();
        let current_user_id = Principal::anonymous(); // Replace with a specific Principal
        let liked_user_id = Principal::anonymous(); // Replace with a different Principal

        let mut current_user_profile = create_mock_user_profile(current_user_id);
        let mut liked_user_profile = create_mock_user_profile(liked_user_id);

        // Simulate both users liking each other
        current_user_profile.likes.insert(liked_user_id);
        liked_user_profile.likes.insert(current_user_id);

        profiles.insert(current_user_id, current_user_profile);
        profiles.insert(liked_user_id, liked_user_profile);

        let is_match = check_for_match(&mut profiles, current_user_id, liked_user_id);

        assert!(is_match);
    }
}
