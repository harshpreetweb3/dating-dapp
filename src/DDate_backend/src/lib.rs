mod user_profiles;
use ic_cdk::export::{candid::{CandidType, Deserialize}};
use user_profiles::create_kro_profile;
use user_profiles::get_kro_profile;
use user_profiles::delete_kro_profile;
use user_profiles::update_kro_profile;
mod profile_matcher;

use candid::Principal;
extern crate ic_cdk;
//use ic_cdk::api;  // dekha ge
use ic_cdk_macros::*;

//use user_profiles::UserProfileParamss;

#[derive(CandidType, Deserialize)]
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
    new_introduction: Option<String>
}

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
}


// Example of a public function that can be called on the blockchain

#[update]
#[ic_cdk::export::candid::candid_method]
//fn add_user_profile(id : Principal,username: String, age: u64, gender: String, location: String, min_age: u64, max_age: u64, preferred_gender: String, preferred_location: String) {
    fn add_user_profile(
        params: UserProfileParams
    ){    // Logging the received data
    ic_cdk::println!("Received username: {}", params.name);
    ic_cdk::println!("Received age: {}", params.age);
   
create_kro_profile(params)
}
// b5pqo-yef5a-lut3t-kmrpc-h7dnp-v3d2t-ls6di-y33wa-clrtb-xdhl4-dae
#[update]
fn get_profile(id: Principal){

    let user_profile = get_kro_profile(id);

    match user_profile {
        Some(profile) => {
            // Do something with the profile
            ic_cdk::println!("Got user profile: {:?}", profile);
            
        },
        None => {
            ic_cdk::println!("No profile found for given ID");
        }
    }
}

#[update]
fn delete_profile(id : Principal){
    delete_kro_profile(id);
    //ic_cdk::println!()
}


#[update]
fn update_profile( params : UpdateUserProfileParams){
    update_kro_profile(params);
}


// #[update]
// fn update_profile( id: Principal, 
//     new_name: Option<String>, 
//     new_age: Option<u64>, 
//     new_gender: Option<String>, 
//     new_location: Option<String>,
//     new_min_preferred_age: Option<u64>, 
//     new_max_preferred_age: Option<u64>, 
//     new_preferred_gender: Option<String>,
//     new_preferred_location: Option<String>){
//     update_kro_profile(
//         id, 
//         new_name, 
//         new_age, 
//         new_gender, 
//         new_location,
//         new_min_preferred_age, 
//         new_max_preferred_age, 
//         new_preferred_gender,
//         new_preferred_location
//     );
// }



// More functions and implementation details for your smart contracts
#[update]
fn call_print_user_profiles() {
    // Calling the method
    //UserProfileParamss::print_user_profiles();
    
    // ... rest of the function ...
}



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




