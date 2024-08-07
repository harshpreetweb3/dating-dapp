// use crate::notification::send_like_notification;
// use crate::send_like_notification;
use crate::{query, update, send_like_notification};

// use ic_cdk::export::candid::Principal;
use std::{cell::RefCell, collections::HashMap};

// pub fn like_profile(
//     profiles: &mut HashMap<Principal, UserProfile>,
//     current_user_id: Principal,
//     liked_user_id: Principal,
// ) {

//     if let Some(user_profile) = profiles.get_mut(&current_user_id) {

//         user_profile.likes.insert(liked_user_id);

//         ic_cdk::println!("liked!");

//         //send_like_notification(current_user_id, liked_user_id);
//         match send_like_notification(profiles, current_user_id, liked_user_id) {

//             Ok(()) => println!("Notification sent successfully"),

//             Err(e) => println!("Error sending notification: {}", e),
//         }
//     }
// }

// pub fn check_for_match(

//     profiles: &mut HashMap<Principal, UserProfile>,
//     current_user_id: Principal,
//     liked_user_id: Principal,

// ) -> bool {

//     like_profile(profiles, current_user_id, liked_user_id);

//     if let Some(liked_user_profile) = profiles.get(&liked_user_id) {

//         if liked_user_profile.likes.contains(&current_user_id) {

//             ic_cdk::println!(
//                 "matching has been done between {} and {}",
//                 current_user_id,
//                 liked_user_id
//             );

//             return true;
//         }

//     }

//     ic_cdk::println!("matched is not made");
//     false
// }

struct Likes {
    pub liked_profiles: HashMap<String, Vec<String>>,
}

thread_local! {
    pub static LIKED_PROFILES: RefCell<Likes> = RefCell::new(Likes::new())

}

impl Likes {
    pub fn new() -> Self {
        Likes {
            liked_profiles: HashMap::new(),
        }
    }

    pub fn like_profile(&mut self, current_user_id: String, liked_user_id: String) -> String{

        self.liked_profiles
            .entry(current_user_id.clone())
            .or_insert_with(Vec::new)
            .push(liked_user_id.clone());

        ic_cdk::println!("profile got liked !");
        
        send_like_notification(current_user_id.clone(), liked_user_id.clone())

    }

    // if both of them likes each other, it will return TRUE
    pub fn like_profile_and_check_for_match(
        &mut self,
        current_user_id: String,
        liked_user_id: String,
    ) -> bool {
        self.like_profile(current_user_id.clone(), liked_user_id.clone());

        if let Some(liked_user_profile) = self.liked_profiles.get(&liked_user_id.clone()).cloned() {
            if liked_user_profile.contains(&current_user_id) {
                ic_cdk::println!(
                    "matching has been done between {} and {}",
                    current_user_id,
                    liked_user_id
                );

                ic_cdk::println!("match has been made");
                return true;
            }
        } else {
            ic_cdk::println!("whom you are liking is not on the platform !");
        }

        ic_cdk::println!("match is not made");
        false
    }

    pub fn who_liked_my_profile(&self, user_id: String) -> Result<Vec<String>, String> {
        let get_likes = self.liked_profiles.get(&user_id.clone()).cloned();

        match get_likes {
            Some(likes) => {

                ic_cdk::println!("liked by {:?}", likes);
                Ok(likes)

            },
            None => Err("you have attained no likes as of now".to_string()),
        }
    }
}

#[update]
fn like_and_check_match(current_user_id: String, liked_user_id: String) -> bool {
    LIKED_PROFILES.with(|profiles| {
        profiles
            .borrow_mut()
            .like_profile_and_check_for_match(current_user_id, liked_user_id)
    })
}

#[query]
fn who_liked_my_profile(user_id: String) -> Result<Vec<String>, String> {
    LIKED_PROFILES.with(|profiles| profiles.borrow_mut().who_liked_my_profile(user_id))
}

#[update]
fn like_profile(current_user_id: String, liked_user_id: String) -> String {
    LIKED_PROFILES.with(|profiles| {
        profiles
            .borrow_mut()
            .like_profile(current_user_id, liked_user_id)
    })
}
