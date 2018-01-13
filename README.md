# DB設計

## usersテーブル

|Column  |Type  |Options                               |
|:-------|:-----|:-------------------------------------|
|name    |string|null: false, unique: true, index: true|
|mail    |string|null: false, unique: true             |
|password|string|null: false                           |

### Association
- has_many :groups, through: members
- has_many :members
- has_many :messages

## groupsテーブル

|Column|Type  |Options    |
|:-----|:-----|:----------|
|name  |string|null: false|

### Association
- has_many :users, through: members
- has_many :members
- has_many :messages

## membersテーブル

|Column  |Type   |Options                                    |
|:-------|:------|:------------------------------------------|
|group_id|integer|null: false, foreign_key: true, index: true|
|user_id |integer|null: false, foreign_key: true, index: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column  |Type   |Options                                    |
|:-------|:------|:------------------------------------------|
|user_id |integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true, index: true|
|comment |text   |                                           |
|image   |string |                                           |

### Association
- belongs_to :user
- belongs_to :group