use crate::{CandidType, Deserialize, HashMap, RefCell, Serialize, update, query};

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Notification {
    pub sender_id: String,
    pub receiver_id: String,
    pub notification_type: NotificationType,
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub enum NotificationType {
    Like,
}

thread_local! {
    pub static NOTIFICATIONS: RefCell<NotificationManager> = RefCell::new(NotificationManager::new())

}

pub struct NotificationManager {
    pub notification_container: HashMap<String, Vec<Notification>>,
}

impl NotificationManager {
    pub fn new() -> Self {
        NotificationManager {
            notification_container: HashMap::new(),
        }
    }

    pub fn send_like_notification(
        &mut self,
        sender_id: String,
        receiver_id: String,
    ) -> String {

        // const MAX_NOTIFICATIONS: usize = 20;

        let like_notification = Notification {
            sender_id,
            receiver_id : receiver_id.clone(),
            notification_type: NotificationType::Like,
        };

        self.notification_container
            .entry(receiver_id.clone())
            .or_insert_with(Vec::new)
            .push(like_notification);

        format!("notification sent to {}", receiver_id.clone())

    }

    pub fn get_notifications(&self, user_id: String) -> Vec<Notification> {
        self.notification_container
            .get(&user_id)
            .map(|alerts| alerts.iter().cloned().collect())
            .unwrap_or_else(Vec::new)
    }



}



#[update]
pub fn send_like_notification(user_id: String, receiver_id: String) -> String {
    NOTIFICATIONS.with(|notifications| {
        notifications.borrow_mut().send_like_notification(user_id, receiver_id)
    })
}

#[query]
pub fn get_user_notifications(user_id: String) -> Vec<Notification> {
    NOTIFICATIONS.with(|notifications| {
        notifications.borrow().get_notifications(user_id)
    })
}

