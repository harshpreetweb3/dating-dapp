use std::fs::File;
use std::io::{self, Write};
use std::path::Path;


pub struct ProfilePictureUploader {
    // Directory path where images will be stored
    storage_directory: String,
}


impl ProfilePictureUploader {
    pub fn new(storage_directory: String) -> Self {
        ProfilePictureUploader { storage_directory }
    }

    pub fn upload(&self, image_data: &[u8], file_name: &str) -> io::Result<()> {
        // Construct the full path where the image will be saved
        let file_path = Path::new(&self.storage_directory).join(file_name);

        // Create a file and write the image data to it
        let mut file = File::create(file_path)?;
        file.write_all(image_data)?;

        println!("Image has been uploaded successfully.");

        Ok(())
    }

    
}
