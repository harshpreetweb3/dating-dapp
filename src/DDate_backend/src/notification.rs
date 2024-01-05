use crate::user_profiles::USER_PROFILES;
use ic_cdk::export::candid::Principal;
use std::collections::HashMap;
// use crate::notification::{Notification, NotificationType};
use crate::user_profiles::Notification;
use crate::user_profiles::NotificationType;
use crate::user_profiles::UserProfile;

pub fn send_like_notification(
    profiles: &mut HashMap<Principal, UserProfile>,
    sender_id: Principal,
    receiver_id: Principal,
) -> Result<(), String> {
    const MAX_NOTIFICATIONS: usize = 100; // Set the maximum number of notifications per user

    let like_notification = Notification {
        sender_id,
        receiver_id,
        notification_type: NotificationType::Like,
    };

    // Directly access the profiles HashMap
    if let Some(receiver_profile) = profiles.get_mut(&receiver_id) {
        if receiver_profile.notifications.len() >= MAX_NOTIFICATIONS {
            receiver_profile.notifications.pop_front(); // Remove the oldest notification
        }
        receiver_profile.notifications.push_back(like_notification);
        Ok(())
    } else {
        Err("Receiver profile not found".to_string())
    }
}

pub fn get_notifications(user_id: Principal) -> Vec<Notification> {
    USER_PROFILES.with(|profiles| {
        profiles
            .borrow()
            .profiles
            .get(&user_id)
            .map(|profile| profile.notifications.iter().cloned().collect())
            .unwrap_or_else(Vec::new)
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use ic_cdk::export::candid::Principal;
    use std::collections::{HashMap, HashSet, VecDeque};

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
            likes: HashSet::new(),          // Empty set of likes
            matches: Vec::new(),            // Empty list of matches
            notifications: VecDeque::new(), // Empty notifications
            images: vec!["image1.jpg".to_string()],
            matched_profiles: Vec::new(), // Empty matched profiles
        }
    }

    #[test]
    fn test_send_like_notification() {
        let sender_id = Principal::anonymous(); // Mock Principal ID for sender
        let receiver_id = Principal::anonymous(); // Mock Principal ID for receiver

        let mut profiles = HashMap::new();
        profiles.insert(sender_id, create_mock_user_profile(sender_id));
        profiles.insert(receiver_id, create_mock_user_profile(receiver_id));

        let result = send_like_notification(&mut profiles, sender_id, receiver_id);

        assert!(result.is_ok());
        assert_eq!(profiles.get(&receiver_id).unwrap().notifications.len(), 1);
    }

    #[test]
    fn test_get_notifications() {
        let user_id = Principal::anonymous(); // Mock Principal ID for user
        let mut profiles = HashMap::new();
        let mut user_profile = create_mock_user_profile(user_id);

        // Simulate adding a notification
        let notification = Notification {
            sender_id: user_id,
            receiver_id: user_id,
            notification_type: NotificationType::Like,
        };
        user_profile.notifications.push_back(notification);
        profiles.insert(user_id, user_profile);

        USER_PROFILES.with(|global_profiles| {
            global_profiles.borrow_mut().profiles = profiles;
        });

        let notifications = get_notifications(user_id);

        assert_eq!(notifications.len(), 1);
    }
}
