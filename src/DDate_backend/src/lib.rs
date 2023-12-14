mod user_profiles;
mod profile_matcher;
mod profile_picture_uploader;
mod image_upload;
mod right_and_left_swipe; 
mod notification;

use right_and_left_swipe::check_for_match;

use crate::notification::get_notifications;

use crate::user_profiles::{Notification, NotificationType};
// use crate::user_profiles::NotificationType;

use ic_cdk::export::candid::{CandidType, Deserialize};
use serde::ser::Impossible;

use crate::image_upload::IMAGE_STORAGE;
use user_profiles::create_kro_profile;
use user_profiles::delete_kro_profile;
use user_profiles::get_kro_profile;
use user_profiles::update_kro_profile;
use user_profiles::{ UserProfiles};

use candid::Principal;

use ic_cdk_macros::*;

use crate::user_profiles::USER_PROFILES;

use profile_picture_uploader::ProfilePictureUploader;
extern crate ic_cdk;


// struct for updation

#[derive(CandidType, Deserialize, Clone)]
pub struct UpdateUserProfileParams {
    id: Principal,
    new_name: Option<String>,
    new_email: Option<String>,
    new_mobile_number: Option<String>,
    new_dob: Option<String>,
    new_gender_pronouns: Option<String>,
    new_religion: Option<String>,
    new_height: Option<String>,
    new_zodiac: Option<String>,
    new_diet: Option<String>,
    new_occupation: Option<String>,
    new_looking_for: Option<String>,
    new_smoking: Option<String>,
    new_drinking: Option<String>,
    new_hobbies: Option<Vec<String>>,
    new_sports: Option<Vec<String>>,
    new_art_and_culture: Option<Vec<String>>,
    new_pets: Option<String>,
    new_general_habits: Option<Vec<String>>,
    new_outdoor_activities: Option<Vec<String>>,
    new_travel: Option<Vec<String>>,
    new_movies: Option<Vec<String>>,
    new_interests_in: Option<String>,
    new_age: Option<u64>,
    new_location: Option<String>,
    new_min_preferred_age: Option<u64>,
    new_max_preferred_age: Option<u64>,
    new_preferred_gender: Option<String>,
    new_preferred_location: Option<String>,
    new_matched: Option<bool>,
    new_introduction: Option<String>,
    images : Vec<String>
}


//struct for profile creation
#[derive(CandidType, Deserialize, Clone)]
struct UserProfileParams {
    id: Principal,
    gender: String,
    email: String,
    name: String,
    mobile_number: String,
    dob: String,
    gender_pronouns: String,
    religion: String,
    height: String,
    zodiac: String,
    diet: String,
    occupation: String,
    looking_for: String,
    smoking: String,
    drinking: String,
    hobbies: Vec<String>,
    sports: Vec<String>,
    art_and_culture: Vec<String>,
    pets: String,
    general_habits: Vec<String>,
    outdoor_activities: Vec<String>,
    travel: Vec<String>,
    movies: Vec<String>,
    interests_in: String,
    age: u64,
    location: String,
    min_preferred_age: u64,
    max_preferred_age: u64,
    preferred_gender: String,
    preferred_location: String,
    introduction: String,
    images : Vec<String>
}

// create_profie function

#[update]
#[ic_cdk::export::candid::candid_method]
fn add_user_profile(params: UserProfileParams) {
    ic_cdk::println!("Received username: {}", params.name);
    ic_cdk::println!("Received age: {}", params.age);

    create_kro_profile(params)
}

// get_profile

#[update]
fn get_profile(id: Principal) {
    let user_profile = get_kro_profile(id);

    match user_profile {
        Some(profile) => {
            // Do something with the profile
            ic_cdk::println!("Got user profile: {:?}", profile);
        }
        None => {
            ic_cdk::println!("No profile found for given ID");
        }
    }
}

#[update]
fn delete_profile(id: Principal) {
    delete_kro_profile(id);
}

#[update]
fn update_profile(params: UpdateUserProfileParams) {
    update_kro_profile(params);
}

// Image upload function which is currently being developed
#[update]
pub fn upload_user_profile_picture(user_id: Principal, image_data: Vec<u8>) {
    let uploader = ProfilePictureUploader::new("path/to/storage/directory".to_string());
    let file_name = format!("{}_profile_pic.jpg", user_id);

    match uploader.upload(&image_data, &file_name) {
        Ok(_) => ic_cdk::println!("Profile picture uploaded successfully."),
        Err(e) => ic_cdk::println!("Failed to upload profile picture: {}", e),
    }
}

// Currently keeping these functions to make them serve some purpose
// they are being used for some other purpose which is not desired

// #[update]
// pub fn send_profile_view_request(from_user: Principal, to_user: Principal) {
//     let notification = Notification {
//         notification_type: NotificationType::ProfileViewRequest(ProfileViewRequest {
//             from_user,
//             to_user,
//         }),
//     };
//     USER_PROFILES.with(|profiles| {
//         profiles
//             .borrow_mut()
//             .add_notification(to_user, notification);
//     });
//     ic_cdk::println!("request is sent!");
// }

// #[update]
// pub fn get_user_notifications(user_id: Principal) -> Vec<Notification> {
//     USER_PROFILES.with(|profiles| profiles.borrow().get_notifications(&user_id))
// }


#[update]
pub fn upload_image(image_id: String, base_64: String){
    IMAGE_STORAGE.with(|images| images.borrow_mut().store_image(image_id, base_64))
}

#[update]
pub fn get_image(img_id :String){
    IMAGE_STORAGE.with(|images| {
        let images = images.borrow();
        if let Some(data) = images.get_image(&img_id) {
            // Process the data here.
            ic_cdk::println!("Image Data: {}", data);
        } else {
            ic_cdk::println!("Image not found.");
        }
    });
}


// #[update]
// pub fn respond_to_friend_request(user_id: Principal, requester_id: Principal, accept: bool) {
//     user_profiles::USER_PROFILES.with(|profiles| {
//         let mut profiles = profiles.borrow_mut();
//         if accept {
//             profiles.add_friend(user_id, requester_id);
//         } else {
//             profiles.reject_friend_request(user_id, requester_id);
//         }
//         profiles.remove_notification(user_id, requester_id);
//     });
// }




//minter
// tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae

//ddate
// b5pqo-yef5a-lut3t-kmrpc-h7dnp-v3d2t-ls6di-y33wa-clrtb-xdhl4-dae

//hustlepreet
// nzi52-qfo3s-435lx-y7wx5-nleil-spy56-5expu-yrexx-7hgiy-hnaqe-yqe

//anonymous
// 2vxsx-fae

//default
//b5p7m-si2ig-xo4us-iqu6c-q4rql-w6pfk-l6qat-wgmjf-id2av-z3te7-gqe



// #[update]
// fn like_user(current_user_id: Principal, liked_user_id: Principal) {
//     USER_PROFILES.with(|user_profiles| {
//         let mut user_profiles = user_profiles.borrow_mut();
//         let profiles = &mut user_profiles.profiles; // Access the HashMap
//         like_profile(profiles, current_user_id, liked_user_id);
//     });
// }

#[update]
fn check_user_match(current_user_id: Principal, potential_match_id: Principal) -> bool {
    USER_PROFILES.with(|user_profiles| {
        let mut user_profiles = user_profiles.borrow_mut();
        let profiles = &mut user_profiles.profiles; // Access the HashMap
        check_for_match(profiles, current_user_id, potential_match_id)
    })
}

#[update]
pub fn retrieve_notifications_for_user(user_id: Principal) -> Vec<Notification> {
    // Call the get_notifications function and convert VecDeque to Vec
    let notifications: Vec<Notification> = get_notifications(user_id)
        .iter() // Use iter() to create an iterator
        .cloned() // Clone each item (Notification) in the iterator
        .collect(); // Collect the cloned items into a Vec<Notification>

    // Return the notifications as Vec<Notification>
    notifications
}