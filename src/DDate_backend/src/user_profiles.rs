use crate::profile_matcher;
use crate::profile_matcher::find_matches ;
use std::cell::RefCell;
use std::io::Read; 
use std::collections::{HashMap, HashSet, VecDeque};
use ic_cdk::api::stable::{StableWriter, StableReader};
use ic_cdk_macros::{pre_upgrade, post_upgrade, update};
use serde::{Serialize, Deserialize};
use bincode;
use candid::{CandidType, Principal};
use ic_cdk::api::caller;
use crate::{UserProfileParams, UpdateUserProfileParams};

// Notification-related structs
// #[derive(Serialize, Deserialize, CandidType, Clone, Debug)]
// pub struct ProfileViewRequest {
//     pub from_user: Principal,
//     pub to_user: Principal,
// }

// #[derive(Serialize, Deserialize, CandidType, Clone, Debug)]
// pub enum NotificationType {
//     ProfileViewRequest(ProfileViewRequest),
//     // Other notification types can be added here
// }

// #[derive(Serialize, Deserialize, CandidType, Clone, Debug)]
// pub struct Notification {
//     pub notification_type: NotificationType,
//     // Add other fields like timestamp, read/unread status, etc.
// }

// 

#[pre_upgrade]
fn pre_upgrade() {
    // Serialize and write data to stable storage
    USER_PROFILES.with(|profiles| {
        let serialized = bincode::serialize(&*profiles.borrow()).expect("Serialization failed");
        let mut writer = StableWriter::default();
        writer.write(&serialized).expect("Failed to write to stable storage");
    });
    ic_cdk::println!("pre upgrade is implemented");
}


// #[post_upgrade]
// fn post_upgrade() {
//     // Read and deserialize data from stable storage
//     let mut reader = StableReader::default();
//     let mut data = Vec::new();
//     reader.read_to_end(&mut data).expect("Failed to read from stable storage");
//     let profiles: UserProfiles = bincode::deserialize(&data).expect("Deserialization failed");
//     // Restore data
//     USER_PROFILES.with(|p| {
//         *p.borrow_mut() = profiles;
//     });
//     ic_cdk::println!("post upgrade is implemented");
// }

#[derive(Serialize, Deserialize, Clone)] // Derive the Clone trait for UserProfile
// pub struct UserProfile {
//     username: String,
//     age: u32,
//     // preferences: HashMap<String, String>, // Example of additional data
// }


// pub struct UserProfile {
//     pub id: Principal,
//     pub name: String,
//     pub age: u64,
//     pub gender: String,
//     pub location: String,
//     pub min_preferred_age: u64,
//     pub max_preferred_age: u64,
//     pub preferred_gender: String,
//     pub preferred_location: String, // New preferred location field
//     pub matched: bool, // Track if the user is matched
// }
#[derive(Debug, CandidType)]
    pub struct UserProfile {
        pub id: Principal,
        pub gender: String,
        pub email: String,
        pub name: String,
        pub mobile_number: String,
        pub dob: String,
        pub gender_pronouns: String,
        pub religion: String,
        pub height: String,
        pub zodiac: String,
        pub diet: String,
        pub occupation: String,
        pub looking_for: String,
        pub smoking: String,
        pub drinking: String,
        pub hobbies: Vec<String>,
        pub sports: Vec<String>,
        pub art_and_culture: Vec<String>,
        pub pets: String,
        pub general_habits: Vec<String>,
        pub outdoor_activities: Vec<String>,
        pub travel: Vec<String>,
        pub movies: Vec<String>,
        pub interests_in: String,
        pub age: u64,
        pub location: String, // missing 
        pub min_preferred_age: u64,
        pub max_preferred_age: u64,
        pub preferred_gender: String, // hai
        pub preferred_location: String, // missing 
        //pub matched: bool, 
        pub introduction: String,
        pub likes: HashSet<Principal>, // Add this to store likes
        pub matches: HashSet<Principal>,
        pub notifications: VecDeque<Notification>,
        pub images: Vec<String>,
        pub matched_profiles : Vec<Principal>
        //pub notifications: Vec<Notification>,
        //pub friends: Vec<Principal>,
        //pub rejected_requests: Vec<Principal>, 
    }


    // Define the Notification struct
// Define the Notification struct
#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Notification {
    pub sender_id: Principal,
    pub receiver_id: Principal,
    pub notification_type: NotificationType,
    // Additional fields as needed
}
#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub enum NotificationType {
    Like,
    // Add other notification types as needed
}

    // pub struct UserProfileParams {
    //     pub id: Principal,
    //     pub gender: String,
    //     pub email: String,
//     pub name: String,
//     pub mobile_number: String,
//     pub dob: String,
//     pub gender_pronouns: String,
//     pub religion: String,
//     pub height: String,
//     pub zodiac: String,
//     pub diet: String,
//     pub occupation: String,
//     pub looking_for: String,
//     pub smoking: String,
//     pub drinking: String,
//     pub hobbies: Vec<String>,
//     pub sports: Vec<String>,
//     pub art_and_culture: Vec<String>,
//     pub pets: String,
//     pub general_habits: Vec<String>,
//     pub outdoor_activities: Vec<String>,
//     pub travel: Vec<String>,
//     pub movies: Vec<String>,
//     pub interests_in: String,
//     pub age: u64,
//     pub location: String,
//     pub min_preferred_age: u64,
//     pub max_preferred_age: u64,
//     pub preferred_gender: String,
//     pub preferred_location: String, 
//     pub matched: bool, 
//     pub introduction: String,
// }



#[derive(Serialize, Deserialize)]
pub struct UserProfiles {
    pub profiles: HashMap<Principal, UserProfile>,
}

// Wrap UserProfiles in a RefCell for interior mutability
 thread_local! {
    pub static USER_PROFILES: RefCell<UserProfiles> = RefCell::new(UserProfiles::new());
}

impl UserProfiles {

    // Initialize   
    pub fn new() -> Self {
        UserProfiles {
            profiles: HashMap::new(),
        }
    }
    // Create profile
    // pub fn create_profile(&mut self, id: Principal, username: String, age: u64, gender: String, location: String, min_age: u64, max_age: u64, preferred_gender: String, preferred_location: String) {
        pub fn create_profile(
            &mut self, 
            params : UserProfileParams
             // Assuming 'matched' is a boolean field to be set when creating the profile
        ) {
        // let profile = UserProfile {
        //     id,
        //     name: username,
        //     age,
        //     gender,
        //     location,
        //     min_preferred_age: min_age,
        //     max_preferred_age: max_age,
        //     preferred_gender,
        //     preferred_location, // Set the preferred location
        //     matched: false,
        // };

        let profile = UserProfile {
            id: params.id.clone(),
            name: params.name.clone(),
            age: params.age,
            gender: params.gender.clone(),
            email: params.email.clone(),
            mobile_number: params.mobile_number.clone(),
            dob: params.dob.clone(),
            gender_pronouns: params.gender_pronouns.clone(),
            religion: params.religion.clone(),
            height: params.height.clone(),
            zodiac: params.zodiac.clone(),
            diet: params.diet.clone(),
            occupation: params.occupation.clone(),
            looking_for: params.looking_for.clone(),
            smoking: params.smoking.clone(),
            drinking: params.drinking.clone(),
            hobbies: params.hobbies.clone(),
            sports: params.sports.clone(),
            art_and_culture: params.art_and_culture.clone(),
            pets: params.pets.clone(),
            general_habits: params.general_habits.clone(),
            outdoor_activities: params.outdoor_activities.clone(),
            travel: params.travel.clone(),
            movies: params.movies.clone(),
            interests_in: params.interests_in.clone(),
            location: params.location.clone(),
            min_preferred_age: params.min_preferred_age,
            max_preferred_age: params.max_preferred_age,
            preferred_gender: params.preferred_gender.clone(),
            preferred_location: params.preferred_location.clone(),
            introduction: params.introduction.clone(),
            likes: HashSet::new(),
            matches: HashSet::new(),
            notifications: VecDeque::new(),
            images: params.images.clone(),
            matched_profiles: Vec::new()
            // notifications: Vec::new(),
            // friends: Vec::new(),
            // rejected_requests : Vec::new()
        };
        ic_cdk::println!("Profile created for user: {}", profile.name);
        self.profiles.insert(profile.id.clone(), profile);
        
       
    }

    // pub fn get_profile(&self, id: &Principal) -> Option<&UserProfile> {
    //     self.profiles.get(id)
    // }

    pub fn get_mut_profile(&mut self, id: &Principal) -> Option<&mut UserProfile> {
        self.profiles.get_mut(id)
    }
    

    pub fn get_profile(&self, id: &Principal) -> Option<&UserProfile> {
        self.profiles.get(id)
    }

    // Function to delete a user profile
    pub fn delete_profile(&mut self, id: Principal) {
        self.profiles.remove(&id);
        ic_cdk::println!("Profile is deleted successfully");
    }

    // pub fn update_profile(&mut self, id: Principal, new_name: Option<String>, new_age: Option<u64>, new_gender: Option<String>, new_location: Option<String>, new_min_preferred_age: Option<u64>, new_max_preferred_age: Option<u64>, new_preferred_gender: Option<String>, new_preferred_location: Option<String>) {
    //     if let Some(profile) = self.profiles.get_mut(&id) {
    //         if let Some(name) = new_name {
    //             profile.name = name;
    //         }
    //         if let Some(age) = new_age {
    //             profile.age = age;
    //         }
    //         if let Some(gender) = new_gender {
    //             profile.gender = gender;
    //         }

    //         if let Some(location) = new_location {
    //             profile.location = location;
    //         }
    
    //         // Update additional fields
    //         if let Some(min_age) = new_min_preferred_age {
    //             profile.min_preferred_age = min_age;
    //         }
    //         if let Some(max_age) = new_max_preferred_age {
    //             profile.max_preferred_age = max_age;
    //         }
    //         if let Some(preferred_gender) = new_preferred_gender {
    //             profile.preferred_gender = preferred_gender;
    //         }
    //         if let Some(preferred_location) = new_preferred_location {
    //             profile.preferred_location = preferred_location;
    //         }
    
    //         ic_cdk::println!("Profile for {} updated successfully.", id);
    //     } else {
    //         ic_cdk::println!("No profile found for ID: {}", id);
    //     }
    // }

    pub fn update_profile(&mut self, params: UpdateUserProfileParams) {
        if let Some(profile) = self.profiles.get_mut(&params.id) {
            if let Some(name) = params.new_name {
                profile.name = name;
            }
            if let Some(email) = params.new_email {
                profile.email = email;
            }
            if let Some(mobile_number) = params.new_mobile_number {
                profile.mobile_number = mobile_number;
            }
            if let Some(dob) = params.new_dob {
                profile.dob = dob;
            }
            if let Some(gender_pronouns) = params.new_gender_pronouns {
                profile.gender_pronouns = gender_pronouns;
            }
            if let Some(religion) = params.new_religion {
                profile.religion = religion;
            }
            if let Some(height) = params.new_height {
                profile.height = height;
            }
            if let Some(zodiac) = params.new_zodiac {
                profile.zodiac = zodiac;
            }
            if let Some(diet) = params.new_diet {
                profile.diet = diet;
            }
            if let Some(occupation) = params.new_occupation {
                profile.occupation = occupation;
            }
            if let Some(looking_for) = params.new_looking_for {
                profile.looking_for = looking_for;
            }
            if let Some(smoking) = params.new_smoking {
                profile.smoking = smoking;
            }
            if let Some(drinking) = params.new_drinking {
                profile.drinking = drinking;
            }
            if let Some(hobbies) = params.new_hobbies {
                profile.hobbies = hobbies;
            }
            if let Some(sports) = params.new_sports {
                profile.sports = sports;
            }
            if let Some(art_and_culture) = params.new_art_and_culture {
                profile.art_and_culture = art_and_culture;
            }
            if let Some(pets) = params.new_pets {
                profile.pets = pets;
            }
            if let Some(general_habits) = params.new_general_habits {
                profile.general_habits = general_habits;
            }
            if let Some(outdoor_activities) = params.new_outdoor_activities {
                profile.outdoor_activities = outdoor_activities;
            }
            if let Some(travel) = params.new_travel {
                profile.travel = travel;
            }
            if let Some(movies) = params.new_movies {
                profile.movies = movies;
            }
            if let Some(interests_in) = params.new_interests_in {
                profile.interests_in = interests_in;
            }
            if let Some(age) = params.new_age {
                profile.age = age;
            }
            if let Some(location) = params.new_location {
                profile.location = location;
            }
            if let Some(min_preferred_age) = params.new_min_preferred_age {
                profile.min_preferred_age = min_preferred_age;
            }
            if let Some(max_preferred_age) = params.new_max_preferred_age {
                profile.max_preferred_age = max_preferred_age;
            }
            if let Some(preferred_gender) = params.new_preferred_gender {
                profile.preferred_gender = preferred_gender;
            }
            if let Some(preferred_location) = params.new_preferred_location {
                profile.preferred_location = preferred_location;
            }
            // if let Some(matched) = params.new_matched {
            //     profile.matched = matched;
            // }
            if let Some(introduction) = params.new_introduction {
                profile.introduction = introduction;
            }
    
            ic_cdk::println!("Profile for {} updated successfully.", params.id);
        } else {
            ic_cdk::println!("No profile found for ID: {}", params.id);
        }
    }
    

    // pub fn send_notification(&mut self, sender_id: Principal, receiver_id: Principal, notification_type: NotificationType) {
    //     let notification = Notification {
    //         sender_id,
    //         receiver_id,
    //         notification_type,
    //     };
    //     self.notifications.push_back(notification);
    // }

//     pub fn add_notification(&mut self, user_id: Principal, notification: Notification) {
//         if let Some(profile) = self.profiles.get_mut(&user_id) {
//             profile.notifications.push(notification);
//         }
//     }

//     pub fn get_notifications(&self, user_id: &Principal) -> Vec<Notification> {
//         self.profiles.get(user_id).map_or_else(Vec::new, |profile| profile.notifications.clone())
//     }

//     pub fn add_friend(&mut self, user_id: Principal, friend_id: Principal) {
//         if let Some(profile) = self.profiles.get_mut(&user_id) {
//             profile.friends.push(friend_id);
//             ic_cdk::println!("You have added them as a friend")
//         }
//     }

//     pub fn remove_notification(&mut self, user_id: Principal, requester_id: Principal) {
//         if let Some(profile) = self.profiles.get_mut(&user_id) {
//             profile.notifications.retain(|notification| {
//                 if let NotificationType::ProfileViewRequest(req) = &notification.notification_type {
//                     !(req.from_user == requester_id && req.to_user == user_id)
//                 } else {
//                     true
//                 }
//             });

//             ic_cdk::println!("notification is removed");

//              // Add the requester_id to the rejected requests list
//              if !profile.rejected_requests.contains(&requester_id) {
//                 profile.rejected_requests.push(requester_id);
//             }
//         }
//     }

//     pub fn reject_friend_request(&mut self, user_id: Principal, requester_id: Principal) {
//         if let Some(profile) = self.profiles.get_mut(&user_id) {
//             // Remove the friend request notification
//             profile.notifications.retain(|notification| {
//                 if let NotificationType::ProfileViewRequest(req) = &notification.notification_type {
//                     !(req.from_user == requester_id && req.to_user == user_id)

//                 } else {
//                     true
//                 }
//             });

//             ic_cdk::println!("reject function is called");

//             // Add the requester_id to the rejected requests list
//             if !profile.rejected_requests.contains(&requester_id) {
//                 profile.rejected_requests.push(requester_id);
//             }
//         }
//     }

    

// //     pub fn update_profile(
// //         &mut self, 
// //         id: Principal, 
// //         new_name: Option<String>, 
// //         new_email: Option<String>,
// //         new_mobile_number: Option<String>,
// //         new_dob: Option<String>,
// //         new_gender_pronouns: Option<String>,
//         new_religion: Option<String>,
//         new_height: Option<String>,
//         new_zodiac: Option<String>,
//         new_diet: Option<String>,
//         new_occupation: Option<String>,
//         new_looking_for: Option<String>,
//         new_smoking: Option<String>,
//         new_drinking: Option<String>,
//         new_hobbies: Option<Vec<String>>,
//         new_sports: Option<Vec<String>>,
//         new_art_and_culture: Option<Vec<String>>,
//         new_pets: Option<String>,
//         new_general_habits: Option<Vec<String>>,
//         new_outdoor_activities: Option<Vec<String>>,
//         new_travel: Option<Vec<String>>,
//         new_movies: Option<Vec<String>>,
//         new_interests_in: Option<String>,
//         new_age: Option<u64>,
//         new_location: Option<String>,
//         new_min_preferred_age: Option<u64>, 
//         new_max_preferred_age: Option<u64>, 
//         new_preferred_gender: Option<String>,
//         new_preferred_location: Option<String>,
//         new_matched: Option<bool>,
//         new_introduction: Option<String>
//     ) {
//         if let Some(profile) = self.profiles.get_mut(&id) {
//             if let Some(name) = new_name {
//                 profile.name = name;
//             }
//             if let Some(email) = new_email {
//                 profile.email = email;
//             }
//             if let Some(mobile_number) = new_mobile_number {
//                 profile.mobile_number = mobile_number;
//             }
//             if let Some(dob) = new_dob {
//                 profile.dob = dob;
//             }
//             if let Some(gender_pronouns) = new_gender_pronouns {
//                 profile.gender_pronouns = gender_pronouns;
//             }
//             if let Some(religion) = new_religion {
//                 profile.religion = religion;
//             }
//             if let Some(height) = new_height {
//                 profile.height = height;
//             }
//             if let Some(zodiac) = new_zodiac {
//                 profile.zodiac = zodiac;
//             }
//             if let Some(diet) = new_diet {
//                 profile.diet = diet;
//             }
//             if let Some(occupation) = new_occupation {
//                 profile.occupation = occupation;
//             }
//             if let Some(looking_for) = new_looking_for {
//                 profile.looking_for = looking_for;
//             }
//             if let Some(smoking) = new_smoking {
//                 profile.smoking = smoking;
//             }
//             if let Some(drinking) = new_drinking {
//                 profile.drinking = drinking;
//             }
//             if let Some(hobbies) = new_hobbies {
//                 profile.hobbies = hobbies;
//             }
//             if let Some(sports) = new_sports {
//                 profile.sports = sports;
//             }
//             if let Some(art_and_culture) = new_art_and_culture {
//                 profile.art_and_culture = art_and_culture;
//             }
//             if let Some(pets) = new_pets {
//                 profile.pets = pets;
//             }
//             if let Some(general_habits) = new_general_habits {
//                 profile.general_habits = general_habits;
//             }
//             if let Some(outdoor_activities) = new_outdoor_activities {
//                 profile.outdoor_activities = outdoor_activities;
//             }
//             if let Some(travel) = new_travel {
//                 profile.travel = travel;
//             }
//             if let Some(movies) = new_movies {
//                 profile.movies = movies;
//             }
//             if let Some(interests_in) = new_interests_in {
//                 profile.interests_in = interests_in;
//             }
//             if let Some(age) = new_age {
//                 profile.age = age;
//             }
//             if let Some(location) = new_location {
//                 profile.location = location;
//             }
//             if let Some(min_preferred_age) = new_min_preferred_age {
//                 profile.min_preferred_age = min_preferred_age;
//             }
//             if let Some(max_preferred_age) = new_max_preferred_age {
//                 profile.max_preferred_age = max_preferred_age;
//             }
//             if let Some(preferred_gender) = new_preferred_gender {
//                 profile.preferred_gender = preferred_gender;
//             }
//             if let Some(preferred_location) = new_preferred_location {
//                 profile.preferred_location = preferred_location;
//             }
//             if let Some(matched) = new_matched {
//                 profile.matched = matched;
//             }
//             if let Some(introduction) = new_introduction {
//                 profile.introduction = introduction;
//             }
    
//             ic_cdk::println!("Profile for {} updated successfully.", id);
//         } else {
//             ic_cdk::println!("No profile found for ID: {}", id);
//         }

    


//     // pub fn print_profiles(){
        
//     // }

//     // state de 
    
    
//       // Other functions...
// }


// Method to add a liked user's ID to the set of likes
// pub fn like(&mut self, liked_user_id: Principal) {
//     self.likes.insert(liked_user_id);
// }


}
//pub fn create_kro_profile(id : Principal,username: String, age: u64, gender: String, location: String, min_age: u64, max_age: u64, preferred_gender: String, preferred_location: String){
    pub fn create_kro_profile(
        params : UserProfileParams
    ){

        let profile_id = params.id.clone(); 

    USER_PROFILES.with(|profiles| {
        let mut profiles = profiles.borrow_mut();
        //profiles.create_profile(id, username, age, gender, location, min_age, max_age, preferred_gender, preferred_location);
        profiles.create_profile(params);
        let profile_count = profiles.profiles.len();
        ic_cdk::println!("Number of user profiles: {}", profile_count);

        if profile_count == 0 {
            ic_cdk::println!("No user profiles found.");
        }

        for (id,  profile) in profiles.profiles.iter() {
            // Print each user profile
            ic_cdk::println!("Username: {}, Age: {}", id, profile.age);
            // Uncomment to print additional data if available
            // ic_cdk::println!("Additional Data: {:?}", profile.preferences);
        }


        // Get a mutable reference to the newly created profile
// if let Some(mut new_profile) = profiles.get_mut_profile(&profile_id) {
//     ic_cdk::println!("this is the new profile u created {}", new_profile.name);

//     // Call find_matches with a mutable reference
//     let matched_profiles = find_matches(&mut profiles.profiles, &mut new_profile);

//     // ... existing code to process matched_profiles ...
// } else {
//     ic_cdk::println!("Newly created profile not found");
// }

// if let Some(mut new_profile) = profiles.get_mut_profile(&profile_id) {
//     ic_cdk::println!("this is the new profile u created {}", new_profile.name);

//     // Filter the user profiles to exclude the new_profile
//     let other_profiles = profiles.profiles.iter()
//         .filter(|(id, _)| *id != &new_profile.id);

//     // Call find_matches with the filtered iterator
//     let matched_profiles = find_matches(other_profiles, &mut new_profile);

//     // Process matched_profiles...
// } else {
//     ic_cdk::println!("Newly created profile not found");
// }

// if let Some(mut new_profile) = profiles.get_mut_profile(&profile_id) {
//     ic_cdk::println!("this is the new profile u created {}", new_profile.name);

//     // Collect the IDs to avoid borrowing issues
//     let other_profile_ids: Vec<_> = profiles.profiles.iter()
//         .filter(|(id, _)| *id != &new_profile.id)
//         .map(|(id, _)| *id)
//         .collect();

//     // Now create a filtered iterator using the collected IDs
//     let other_profiles = other_profile_ids.iter()
//         .filter_map(|id| profiles.profiles.get(id));

//     // Call find_matches with the filtered iterator
//     let matched_profiles = find_matches(other_profiles, &mut new_profile);

//     // Process matched_profiles...
// } else {
//     ic_cdk::println!("Newly created profile not found");
// }

// if let Some(mut new_profile) = profiles.get_mut_profile(&profile_id) {
//     ic_cdk::println!("this is the new profile u created {}", new_profile.name);

//     // Collect the IDs to avoid borrowing issues
//     let other_profile_ids: Vec<_> = profiles.profiles.iter()
//         .filter(|(id, _)| *id != &new_profile.id)
//         .map(|(id, _)| *id)
//         .collect();

//     // Create a filtered iterator using the collected IDs
//     let other_profiles = other_profile_ids.iter()
//         .filter_map(|id| {
//             // Map each ID back to a reference to the corresponding (Principal, UserProfile) pair
//             profiles.profiles.get_key_value(id)
//         });

//     // Call find_matches with the filtered iterator
//     let matched_profiles = find_matches(other_profiles, &mut new_profile);

//     // Process matched_profiles...
// } else {
//     ic_cdk::println!("Newly created profile not found");
// }

        // Get a reference to the newly created profile
        // let new_profile = profiles.get_mut_profile(&profile_id).expect("Newly created profile not found");

        // ic_cdk::println!("this is the new profile u created {}", new_profile.name);
        // // Call find_matches
        // let matched_profiles = find_matches(&profiles.profiles, new_profile);

        // // ic_cdk::println!("these are the matched profiles {}", matched_profiles);
        // ic_cdk::println!("{:?}", matched_profiles);

        // for match_id in matched_profiles {
        //     if let Some(matched_profile) = profiles.get_profile(&match_id) {
        //         ic_cdk::println!("Matched Profile: {}, Age: {}", matched_profile.name, matched_profile.age);
        //     }
        // }

        

    });
   

}

pub fn get_kro_profile(id: Principal) -> Option<UserProfile> {
    USER_PROFILES.with(|profiles| {
        profiles.borrow().get_profile(&id).cloned()
    })
}

// Public function to delete a user profile
#[update]
pub fn delete_kro_profile(id: Principal) {
    USER_PROFILES.with(|profiles| {
        profiles.borrow_mut().delete_profile(id);
    });
}

// #[update]
// pub fn update_kro_profile(
//     id: Principal, 
//     new_name: Option<String>, 
//     new_age: Option<u64>, 
//     new_gender: Option<String>, 
//     new_location: Option<String>,
//     new_min_preferred_age: Option<u64>, 
//     new_max_preferred_age: Option<u64>, 
//     new_preferred_gender: Option<String>,
//     new_preferred_location: Option<String>
// ) {
//     USER_PROFILES.with(|profiles| {
//         profiles.borrow_mut().update_profile(
//             id, 
//             new_name, 
//             new_age, 
//             new_gender, 
//             new_location,
//             new_min_preferred_age, 
//             new_max_preferred_age, 
//             new_preferred_gender,
//             new_preferred_location
//         );
//     });
// }




#[update]
pub fn update_kro_profile( params : UpdateUserProfileParams) {
    USER_PROFILES.with(|profiles| {
        profiles.borrow_mut().update_profile(
            params
        );
    });
}



// Assuming this is in the same file as your UserProfiles implementation

// #[cfg(test)]
// mod tests {
//     use super::*;
    

//     // A helper function to set up a testing environment
//     fn setup() -> (UserProfiles, UserProfileParams) {
        
//         // Set a fake caller principal for testing
//         // caller::set_principal(Principal::anonymous());

//         let test_principal = Principal::anonymous(); 

//         // Create a UserProfiles instance
//         let user_profiles = UserProfiles::new();

//         // Define a UserProfileParams instance with test data
//         let params = UserProfileParams {
//             id: test_principal,
//             gender: "female".to_string(),
//             email: "test@example.com".to_string(),
//             name: "Alice".to_string(),
//             mobile_number: "1234567890".to_string(),
//             dob: "1990-01-01".to_string(),
//             gender_pronouns: "she/her".to_string(),
//             religion: "None".to_string(),
//             height: "170cm".to_string(),
//             zodiac: "Aquarius".to_string(),
//             diet: "Vegetarian".to_string(),
//             occupation: "Adventurer".to_string(),
//             looking_for: "Friendship".to_string(),
//             smoking: "No".to_string(),
//             drinking: "Occasionally".to_string(),
//             hobbies: vec!["Exploring", "Reading"].into_iter().map(String::from).collect(),
//             sports: vec!["Croquet"].into_iter().map(String::from).collect(),
//             art_and_culture: vec!["Classical Music"].into_iter().map(String::from).collect(),
//             pets: "Dinah the Cat".to_string(),
//             general_habits: vec!["Early Riser"].into_iter().map(String::from).collect(),
//             outdoor_activities: vec!["Gardening"].into_iter().map(String::from).collect(),
//             travel: vec!["Wonderland"].into_iter().map(String::from).collect(),
//             movies: vec!["Alice in Wonderland"].into_iter().map(String::from).collect(),
//             interests_in: "Puzzles".to_string(),
//             age: 30,
//             location: "Wonderland".to_string(),
//             min_preferred_age: 18,
//             max_preferred_age: 35,
//             preferred_gender: "male".to_string(),
//             preferred_location: "Wonderland".to_string(),
//             introduction: "I love adventures!".to_string(),
//         };

//         (user_profiles, params)
//     }

//     #[test]
//     fn test_create_profile() {
//         let (mut user_profiles, params) = setup();

//         // Call the create_profile function
//         user_profiles.create_profile(params.clone());

//         // Assert that the profile has been added
//         let profile = user_profiles.get_profile(&params.id);
//         assert!(profile.is_some(), "Profile should be present after creation");

//         // Assert that the profile fields are correctly set
//         let profile = profile.unwrap();
//         assert_eq!(profile.name, params.name);
//         assert_eq!(profile.email, params.email);
//         assert_eq!(profile.mobile_number, params.mobile_number);
//         assert_eq!(profile.dob, params.dob);
//         assert_eq!(profile.gender_pronouns, params.gender_pronouns);
//         assert_eq!(profile.religion, params.religion);
//         assert_eq!(profile.height, params.height);
//         assert_eq!(profile.zodiac, params.zodiac);
//         assert_eq!(profile.diet, params.diet);
//         assert_eq!(profile.occupation, params.occupation);
//         assert_eq!(profile.looking_for, params.looking_for);
//         assert_eq!(profile.smoking, params.smoking);
//         assert_eq!(profile.drinking, params.drinking);
//         assert_eq!(profile.hobbies, params.hobbies);
//         assert_eq!(profile.sports, params.sports);
//         assert_eq!(profile.art_and_culture, params.art_and_culture);
//         assert_eq!(profile.pets, params.pets);
//         assert_eq!(profile.general_habits, params.general_habits);
//         assert_eq!(profile.outdoor_activities, params.outdoor_activities);
//         assert_eq!(profile.travel, params.travel);
//         assert_eq!(profile.movies, params.movies);
//         assert_eq!(profile.interests_in, params.interests_in);
//         assert_eq!(profile.age, params.age);
//         assert_eq!(profile.location, params.location);
//         assert_eq!(profile.min_preferred_age, params.min_preferred_age);
//         assert_eq!(profile.max_preferred_age, params.max_preferred_age);
//         assert_eq!(profile.preferred_gender, params.preferred_gender);
//         assert_eq!(profile.preferred_location, params.preferred_location);
//         //assert_eq!(profile.matched, false); // Assuming a new profile is not matched
//         assert_eq!(profile.introduction, params.introduction);
//         // Ensure the notifications, friends, and rejected_requests vectors are initially empty
//         // assert!(profile.notifications.is_empty());
//         // assert!(profile.friends.is_empty());
//         // assert!(profile.rejected_requests.is_empty());
//     }


//     #[test]
//     fn test_get_profile() {
//         let (mut user_profiles, params) = setup();

//         // First, create a profile to ensure there is one to retrieve.
//         user_profiles.create_profile(params.clone());

//         // Now, try to retrieve the profile.
//         let profile = user_profiles.get_profile(&params.id);
//         assert!(profile.is_some(), "Profile should be retrieved successfully");

//         // Optionally, assert that the retrieved profile has the expected data.
//         let profile = profile.unwrap();
//         assert_eq!(profile.name, params.name, "Profile name should match the expected value");
//         // Add more asserts for each field if necessary.
//     }

//     #[test]
//     fn test_delete_profile() {
//         let (mut user_profiles, params) = setup();

//         // First, create a profile to ensure there is one to delete.
//         user_profiles.create_profile(params.clone());

//         // Make sure the profile exists before attempting to delete.
//         let profile = user_profiles.get_profile(&params.id);
//         assert!(profile.is_some(), "Profile should exist before deletion");

//         // Perform the deletion.
//         user_profiles.delete_profile(params.id);

//         // Now, try to retrieve the profile after deletion.
//         let profile_after_deletion = user_profiles.get_profile(&params.id);
//         assert!(profile_after_deletion.is_none(), "Profile should not exist after deletion");
//     }




//     #[test]
//     fn test_update_profile() {
//         let (mut user_profiles, params) = setup();

//         // First, create a profile.
//         user_profiles.create_profile(params.clone());

//         // Define new values for updating the profile.
//         let update_params = UpdateUserProfileParams {
//             id: params.id.clone(),
//             new_name: Some("Updated Alice".to_string()),
//             new_email: Some("updated_email@example.com".to_string()),
//             new_mobile_number: Some("9876543210".to_string()),
//             new_dob: Some("1991-01-01".to_string()),
//             new_gender_pronouns: Some("she/her".to_string()),
//             new_religion: Some("Updated Religion".to_string()),
//             new_height: Some("175cm".to_string()),
//             new_zodiac: Some("Updated Zodiac".to_string()),
//             new_diet: Some("Updated Diet".to_string()),
//             new_occupation: Some("Updated Occupation".to_string()),
//             new_looking_for: Some("Updated Looking For".to_string()),
//             new_smoking: Some("Updated Smoking".to_string()),
//             new_drinking: Some("Updated Drinking".to_string()),
//             new_hobbies: Some(vec!["Updated Hobby1", "Updated Hobby2"].into_iter().map(String::from).collect()),
//             new_sports: Some(vec!["Updated Sport"].into_iter().map(String::from).collect()),
//             new_art_and_culture: Some(vec!["Updated Art and Culture"].into_iter().map(String::from).collect()),
//             new_pets: Some("Updated Pets".to_string()),
//             new_general_habits: Some(vec!["Updated General Habit"].into_iter().map(String::from).collect()),
//             new_outdoor_activities: Some(vec!["Updated Outdoor Activity"].into_iter().map(String::from).collect()),
//             new_travel: Some(vec!["Updated Travel"].into_iter().map(String::from).collect()),
//             new_movies: Some(vec!["Updated Movie"].into_iter().map(String::from).collect()),
//             new_interests_in: Some("Updated Interests".to_string()),
//             new_age: Some(31),
//             new_location: Some("Updated Location".to_string()),
//             new_min_preferred_age: Some(19),
//             new_max_preferred_age: Some(36),
//             new_preferred_gender: Some("Updated Preferred Gender".to_string()),
//             new_preferred_location: Some("Updated Preferred Location".to_string()),
//             new_matched: Some(true),
//             new_introduction: Some("Updated Introduction".to_string()),
//         };

//         // Call the update_profile function.
//         user_profiles.update_profile(update_params.clone());

//         // Retrieve the updated profile and assert the changes.
//         let updated_profile = user_profiles.get_profile(&params.id).expect("Profile should exist");

//         // Assert that the updated fields are set correctly.
//         assert_eq!(updated_profile.name, update_params.new_name.unwrap());
//         assert_eq!(updated_profile.email, update_params.new_email.unwrap());
//         assert_eq!(updated_profile.mobile_number, update_params.new_mobile_number.unwrap());
//         assert_eq!(updated_profile.dob, update_params.new_dob.unwrap());
//         assert_eq!(updated_profile.gender_pronouns, update_params.new_gender_pronouns.unwrap());
//         assert_eq!(updated_profile.religion, update_params.new_religion.unwrap());
//         assert_eq!(updated_profile.height, update_params.new_height.unwrap());
//         assert_eq!(updated_profile.zodiac, update_params.new_zodiac.unwrap());
//         assert_eq!(updated_profile.diet, update_params.new_diet.unwrap());
//         assert_eq!(updated_profile.occupation, update_params.new_occupation.unwrap());
//         assert_eq!(updated_profile.looking_for, update_params.new_looking_for.unwrap());
//         assert_eq!(updated_profile.smoking, update_params.new_smoking.unwrap());
//         assert_eq!(updated_profile.drinking, update_params.new_drinking.unwrap());
//         assert_eq!(updated_profile.hobbies, update_params.new_hobbies.unwrap());
//         assert_eq!(updated_profile.sports, update_params.new_sports.unwrap());
//         assert_eq!(updated_profile.art_and_culture, update_params.new_art_and_culture.unwrap());
//         assert_eq!(updated_profile.pets, update_params.new_pets.unwrap());
//         assert_eq!(updated_profile.general_habits, update_params.new_general_habits.unwrap());
//         assert_eq!(updated_profile.outdoor_activities, update_params.new_outdoor_activities.unwrap());
//         assert_eq!(updated_profile.travel, update_params.new_travel.unwrap());
//         assert_eq!(updated_profile.movies, update_params.new_movies.unwrap());
//         assert_eq!(updated_profile.interests_in, update_params.new_interests_in.unwrap());
//         assert_eq!(updated_profile.age, update_params.new_age.unwrap());
//         assert_eq!(updated_profile.location, update_params.new_location.unwrap());
//         assert_eq!(updated_profile.min_preferred_age, update_params.new_min_preferred_age.unwrap());
//         assert_eq!(updated_profile.max_preferred_age, update_params.new_max_preferred_age.unwrap());
//         assert_eq!(updated_profile.preferred_gender, update_params.new_preferred_gender.unwrap());
//         assert_eq!(updated_profile.preferred_location, update_params.new_preferred_location.unwrap());
//        // assert_eq!(updated_profile.matched, update_params.new_matched.unwrap());
//         assert_eq!(updated_profile.introduction, update_params.new_introduction.unwrap());

//         // Ensure fields not updated remain as originally set
//         // For fields you didn't update, assert they are equal to the original value
//     }


// }
