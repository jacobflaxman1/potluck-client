const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
      {
        user_id: 1,
        user_name: 'test-user-1',
        nickname: 'TU1',
        password: 'password',
      },
      {
        user_id: 2,
        user_name: 'test-user-2',
        nickname: 'TU2',
        password: 'password',

      },
      {
        user_id: 3,
        user_name: 'test-user-3',
        nickname: 'TU3',
        password: 'password',

      },
      {
        user_id: 4,
        user_name: 'test-user-4',
        nickname: 'TU4',
        password: 'password',
      },
    ]
  }

function makePotluckArray(users) {
    return [
        {
            potluck_id: 1,
            potluck_name: 'test 1',
            admin_user: users[0].user_id
        }
    ]
}

function makeItemsArray(potluck, user) {
    return [
        {
            item_id: 1,
            item_name: 'test',
            taken: false,
            potluck_id: potluck[0].potluck_id
        },
        {
            item_id: 2,
            item_name: 'test 2',
            taken: false,
            potluck_id: potluck[1].potluck_id
        }
    ]
}

function makePotluckFictures() {
    const testUsers = makeUsersArray()
    const testPotlucks = makePotluckArray(testUsers)
    const testItems = makeItemsArray(testPotlucks)
}

function cleanTables(db) {
    return db.raw(`TRUNCATE 
            items_table,
            potluck_table,
            users_table,
            potluck_users_table,
            potluck_users_link
            RESTART IDENTITY CASCADE`
    )
}

function seedPoltuckTable(db, users, )