use crate::profile_matcher;
use crate::profile_matcher::find_matches ;
use std::cell::RefCell;
use std::io::Read; // Import the Read trait
use std::collections::HashMap;
use ic_cdk::api::stable::{StableWriter, StableReader};
use ic_cdk_macros::{pre_upgrade, post_upgrade, update};
use serde::{Serialize, Deserialize};
use bincode;
use candid::Principal;
// Import the match_logic module
use crate::call_print_user_profiles;
use crate::{UserProfileParams, UpdateUserProfileParams};

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
//     ic_cdk::println!("pre upgrade is implemented");
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
#[derive(Debug)]
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
    pub location: String,
    pub min_preferred_age: u64,
    pub max_preferred_age: u64,
    pub preferred_gender: String,
    pub preferred_location: String, 
    pub matched: bool, 
    pub introduction: String,
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
    profiles: HashMap<Principal, UserProfile>,
}

// Wrap UserProfiles in a RefCell for interior mutability
thread_local! {
    static USER_PROFILES: RefCell<UserProfiles> = RefCell::new(UserProfiles::new());
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
            matched: false,
        };
        ic_cdk::println!("Profile created for user: {}", profile.name);
        self.profiles.insert(profile.id.clone(), profile);
        
       
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
            if let Some(matched) = params.new_matched {
                profile.matched = matched;
            }
            if let Some(introduction) = params.new_introduction {
                profile.introduction = introduction;
            }
    
            ic_cdk::println!("Profile for {} updated successfully.", params.id);
        } else {
            ic_cdk::println!("No profile found for ID: {}", params.id);
        }
    }
    

//     pub fn update_profile(
//         &mut self, 
//         id: Principal, 
//         new_name: Option<String>, 
//         new_email: Option<String>,
//         new_mobile_number: Option<String>,
//         new_dob: Option<String>,
//         new_gender_pronouns: Option<String>,
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


        
        // Get a reference to the newly created profile
        let new_profile = profiles.get_profile(&profile_id).expect("Newly created profile not found");

        ic_cdk::println!("this is the new profile u created {}", new_profile.name);
        // Call find_matches
        let matched_profiles = find_matches(&profiles.profiles, new_profile);

        // ic_cdk::println!("these are the matched profiles {}", matched_profiles);
        ic_cdk::println!("{:?}", matched_profiles);

        for match_id in matched_profiles {
            if let Some(matched_profile) = profiles.get_profile(&match_id) {
                ic_cdk::println!("Matched Profile: {}, Age: {}", matched_profile.name, matched_profile.age);
            }
        }

        

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








// pub fn print_user_profiles() {
//     println!("print_user_profiles function called!");

//     USER_PROFILES.with(|profiles| {
//         let profiles = profiles.borrow();

//         // Debugging: Check the number of profiles
//         let profile_count = profiles.profiles.len();
//         ic_cdk::println!("Number of user profiles: {}", profile_count);

//         if profile_count == 0 {
//             ic_cdk::println!("No user profiles found.");
//         }

//         for (username, profile) in profiles.profiles.iter() {
//             // Print each user profile
//             ic_cdk::println!("Username: {}, Age: {}", username, profile.age);
//             // Uncomment to print additional data if available
//             // ic_cdk::println!("Additional Data: {:?}", profile.preferences);
//         }
//     });
// }