set -e

image1_base64="data:image/jpeg;base64,$(base64 -w 0 ./dummy_images/ankit_3.jpg)";

image2_base64="data:image/jpeg;base64,$(base64 -w 0 ./dummy_images/ankit_3.jpg)";

image3_base64="data:image/jpeg;base64,$(base64 -w 0 ./dummy_images/ankit_3.jpg)";

# echo $image1_base64;

# Delete a profile
dfx canister call DDate_backend delete_profile '(principal "gm6hj-s2aij-gejcy-2scjm-g7ves-kcgny-3m7t3-tv5yk-sdf7q-dgcm4-eqe")'


dfx canister call DDate_backend add_user_profile '
  (record {
    id=principal "gm6hj-s2aij-gejcy-2scjm-g7ves-kcgny-3m7t3-tv5yk-sdf7q-dgcm4-eqe";
    age=24;
    dob="12/01/1996";
    occupation="Employed";
    height="5.6";
    mobile_number="9999999999";
    diet="Non-Vegetarian";
    travel=(vec {"Mountains"; "Beach"});
    name="Ankit Alahabadia";
    pets="Dogs";
    outdoor_activities=(vec {"Hiking"; "Rafting"});
    min_preferred_age=21;
    email="ankit@gmail.com";
    smoking="Regular";
    drinking="Regular";
    introduction="Heyya, this is Ankit from IIT Delhi. I am very excited to be here. Looking for some meaningful companions to enjoy the company with.";
    art_and_culture=(vec {"Drawing"; "Art Gallery"});
    preferred_location="Delhi";
    gender="Male";
    interests_in="Female";
    preferred_gender="Female";
    gender_pronouns="He/His";
    looking_for="Friendship";
    general_habits=(vec {"Lazy"});
    sports=(vec {"Cricket"; "Football"});
    religion="Hindu";
    movies=(vec {"Action"; "Comedy"});
    location="Delhi";
    zodiac="Aquarius";
    hobbies=(vec {"Dancing"; "Singing"});
    max_preferred_age=30;
    images=(vec {"'"$image1_base64"'"; "'"$image2_base64"'"; "'"$image3_base64"'"});
  })
'

echo "$(dfx canister call DDate_backend get_profile '(principal "gm6hj-s2aij-gejcy-2scjm-g7ves-kcgny-3m7t3-tv5yk-sdf7q-dgcm4-eqe")')"

# Delete a profile
# dfx canister call DDate_backend delete_profile '(principal "gm6hj-s2aij-gejcy-2scjm-g7ves-kcgny-3m7t3-tv5yk-sdf7q-dgcm4-eqe")'

# #!/bin/bash

# # Function to generate a random principal ID
# generate_principal_id() {
#     head -c 29 /dev/urandom | base32 | tr -d '=' | tr '[:upper:]' '[:lower:]'
# }

# # Generate 20 different principal IDs
# principal_ids=()
# for ((i = 0; i < 20; i++))
# do
#     principal_id=$(generate_principal_id)
#     principal_ids+=("$principal_id")
# done

# # Loop through the principal IDs and add user profiles
# for principal_id in "${principal_ids[@]}"
# do
#     dfx canister call DDate_backend add_user_profile '
#       (record {
#         to=(record {
#           owner=(principal "'"$principal_id"'")
#         });
#          amount=100_000;
#     id=(principal "");
#     age=24;
#     dob="12/01/1996";
#     occupation="Employed";
#     height="5.6";
#     mobile_number=9999999999;
#     diet="Non-Vegetarian";
#     travel=(vec {"Mountains"; "Beach"};
#     name="Ankit Alahabadia";
#     pets="Dogs";
#     outdoor_activities=(vec {"Hiking"; "Rafting"});
#     min_preferred_age=21;
#     email="ankit@gmail.com";
#     smoking="Regular";
#     drinking="Regular";
#     introduction="Heyya, this is Ankit from IIT Delhi. I am very excited to be here. Looking for some meaningful companions to enjoy the company with.";
#     art_and_culture=(vec {"Drawing", "Art Gallery"});
#     preferred_loaction="Delhi";
#     gender="Male";
#     interests_in="Female";
#     preferred_gender="Female";
#     gender_pronounds="He/His";
#     looking_for="Friendship";
#     general_habbits=(vec {"Lazy"});
#     sports=(vec {"Cricket"; "Football"});
#     religion="Hindu";
#     movies=(vec {"Action"; "Comedy"});
#     location="Delhi";
#     zodiac="Aquarius";
#     hobbies=(vec {"Dancing"; "Singing"});
#     max_preferred_age=30;
#     images=(vec {"'"$image1_base64"'"; "'"$image2_base64"'"; "'"$image3_base64"'"});
#     '
# done


# (record {id:principal; age:nat64; dob:text; occupation:text; height:text; mobile_number:text; diet:text; travel:vec text; name:text; pets:text; outdoor_activities:vec text; min_preferred_age:nat64; email:text; smoking:text; drinking:text; introduction:text; art_and_culture:vec text; preferred_location:text; gender:text; interests_in:text; preferred_gender:text; gender_pronouns:text; looking_for:text; general_habits:vec text; sports:vec text; religion:text; movies:vec text; location:text; zodiac:text; hobbies:vec text; max_preferred_age:nat64; images:vec text})