// right_and_left_swipe.rs


use crate::user_profiles::UserProfile; // Import UserProfile
use ic_cdk::export::candid::Principal;
use std::collections::HashMap;
use crate::notification::send_like_notification;

pub fn like_profile(
    profiles: &mut HashMap<Principal, UserProfile>,     
    current_user_id: Principal, 
    liked_user_id: Principal
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

// pub fn send_like_notification( receiver: &mut UserProfile) {
//     // Create the like notification
//     let like_notification = Notification {
//         sender_id: self.id,
//         receiver_id: receiver.id,
//         notification_type: NotificationType::Like,
//     };

//     // Add the notification to the receiver's profile
//     receiver.notifications.push_back(like_notification);
// }


pub fn check_for_match(
    profiles: &mut HashMap<Principal, UserProfile>, 
    current_user_id: Principal, 
    liked_user_id: Principal
) -> bool {
    like_profile(profiles, current_user_id, liked_user_id);

    if let Some(liked_user_profile) = profiles.get(&liked_user_id) {
        if liked_user_profile.likes.contains(&current_user_id) {
            ic_cdk::println!("matching has been done between {} and {}", current_user_id, liked_user_id);
            return true;
        }
    }
ic_cdk::println!("matched is not made");
    false
}
