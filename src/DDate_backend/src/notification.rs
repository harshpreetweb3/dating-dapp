use ic_cdk::export::candid::{Principal};
use std::collections::HashMap;
use crate::user_profiles::USER_PROFILES;
// use crate::notification::{Notification, NotificationType};
use crate::user_profiles::Notification;
use crate::user_profiles::NotificationType;
use crate::user_profiles::UserProfile;


// pub fn send_like_notification(sender_id: Principal, receiver_id: Principal) -> Result<(), String> {
//     const MAX_NOTIFICATIONS: usize = 100; // Set the maximum number of notifications per user

//     let like_notification = Notification {
//         sender_id,
//         receiver_id,
//         notification_type: NotificationType::Like,
//     };

//     USER_PROFILES.with(|profiles| {
//         let mut profiles = profiles.borrow_mut();
        
//         if let Some(receiver_profile) = profiles.profiles.get_mut(&receiver_id) {
//             if receiver_profile.notifications.len() >= MAX_NOTIFICATIONS {
//                 receiver_profile.notifications.pop_front(); // Remove the oldest notification
//             }
//             receiver_profile.notifications.push_back(like_notification);
//             Ok(())
//         } else {
//             Err("Receiver profile not found".to_string())
//         }
//     })
// }

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
        profiles.borrow().profiles.get(&user_id)
            .map(|profile| profile.notifications.iter().cloned().collect())
            .unwrap_or_else(Vec::new)
    })
}

// pub fn update_user_matches(profile_id: Principal) {
//     USER_PROFILES.with(|profiles| {
//         let profiles_borrowed = profiles.borrow();
//         let matched_principals = find_matches(&profiles_borrowed.profiles, &profile_id);

//         // Now, update the UserProfile with the matched profiles
//         if let Some(user_profile) = profiles.borrow_mut().profiles.get_mut(&profile_id) {
//             user_profile.matched_profiles = matched_principals;
//         }
//     });
// }