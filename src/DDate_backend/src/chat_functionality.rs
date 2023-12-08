use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;


use ic_cdk_macros::*;
use ic_cdk::api;
use ic_cdk::storage;



#[derive(CandidType, Deserialize, Serialize, Clone)]
struct Message {
    sender: Principal,
    content: String,
    timestamp: u64,
}

#[derive(CandidType, Deserialize, Serialize)]
struct ChatRoom {
    messages: Vec<Message>,
}

#[derive(CandidType, Deserialize, Serialize)]
struct ChatService {
    chat_rooms: HashMap<String, ChatRoom>,
}

impl ChatService {
    pub fn new() -> Self {
        Self {
            chat_rooms: HashMap::new(),
        }
    }

    pub fn create_chat_room(&mut self, room_id: String) {
        self.chat_rooms.entry(room_id).or_insert_with(ChatRoom {
            messages: Vec::new(),
        });
    }

    pub fn send_message(&mut self, room_id: String, sender: Principal, content: String, timestamp: u64) {
        if let Some(room) = self.chat_rooms.get_mut(&room_id) {
            room.messages.push(Message {
                sender,
                content,
                timestamp,
            });
        }
    }

    pub fn get_messages(&self, room_id: &String) -> &Vec<Message> {
        self.chat_rooms.get(room_id).unwrap().messages.as_ref()
    }
}


fn init() {
    let chat_service = ChatService::new();
    storage::store(chat_service);
}

#[update]
fn create_chat_room(room_id: String) {
    let chat_service = storage::get_mut::<ChatService>();
    chat_service.create_chat_room(room_id);
}

#[update]
fn send_message(room_id: String, content: String) {
    let sender = api::caller();
    let timestamp = api::time();

    let chat_service = storage::get_mut::<ChatService>();
    chat_service.send_message(room_id, sender, content, timestamp);
}

#[query]
fn get_messages(room_id: String) -> Vec<Message> {
    let chat_service = storage::get::<ChatService>();
    chat_service.get_messages(&room_id).clone()
}