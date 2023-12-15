// storage.rs (or storage/mod.rs)
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    pub static IMAGE_STORAGE: RefCell<Storage> = RefCell::new(Storage::new());
}

pub struct Storage {
    images: HashMap<String, String>,
}

impl Storage {
    pub fn new() -> Self {
        Storage {
            images: HashMap::new(),
        }
    }

    pub fn store_image(&mut self, image_id: String, base64_data: String) {
        ic_cdk::println!("base64 mil gya {}", base64_data);
        self.images.insert(image_id, base64_data);
        
    }

    pub fn get_image(&self, image_id: &str) -> Option<&String> {
        self.images.get(image_id)
    }
}