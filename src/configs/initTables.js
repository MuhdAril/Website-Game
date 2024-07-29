// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const pool = require("../services/db");
const bcrypt = require("bcrypt");
// #############################################################################################################################################
// DEFINE NUMBER OF SALTROUNDS
// #############################################################################################################################################
const saltRounds = 10;

// #############################################################################################################################################
// CALLBACK FOR INFO ON TABLE CREATION
// #############################################################################################################################################
const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

// #############################################################################################################################################
// DEFINE SQL STATEMENTS
// #############################################################################################################################################
bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);
    const SQLSTATEMENT = `
      DROP TABLE IF EXISTS user;

      DROP TABLE IF EXISTS PlayerUserRel;

      DROP TABLE IF EXISTS task;

      DROP TABLE IF EXISTS taskprogress;

      DROP TABLE IF EXISTS player;

      DROP TABLE IF EXISTS team;

      DROP TABLE IF EXISTS teamparticipants;

      DROP TABLE IF EXISTS quest;

      DROP TABLE IF EXISTS questprogress;

      DROP TABLE IF EXISTS rankings;

      DROP TABLE IF EXISTS messages;


      CREATE TABLE User (
          user_id INT PRIMARY KEY AUTO_INCREMENT,
          username TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE PlayerUserRel (
          id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT NOT NULL,
          player_id INT NOT NULL
      );

      CREATE TABLE Task (
          task_id INT PRIMARY KEY AUTO_INCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          points INT NOT NULL
      );

      CREATE TABLE TaskProgress (
          progress_id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT NOT NULL,
          task_id INT NOT NULL,
          completion_date DATE,
          notes TEXT NOT NULL
      );

      CREATE TABLE Team (
        team_id INT PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL,
        ranking TEXT NOT NULL
      );

      CREATE TABLE TeamParticipants (
        join_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        team_id INT NOT NULL,
        join_date DATE
      );

      CREATE TABLE Quest (
        quest_id INT PRIMARY KEY AUTO_INCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        points INT NOT NULL
      );

      CREATE TABLE QuestProgress (
        progress_id INT PRIMARY KEY AUTO_INCREMENT,
        team_id INT NOT NULL,
        quest_id INT NOT NULL,
        completion_date DATE
      );

      CREATE TABLE Rankings (
        rank_id INT PRIMARY KEY AUTO_INCREMENT,
        ranking TEXT NOT NULL,
        min_points INT NOT NULL
      );

      CREATE TABLE Messages (
        message_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        message_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


      INSERT INTO Task (task_id, title, description, points) VALUES
      (1, 'Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
      (2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
      (3, 'Reduce Plastic', 'Usage Commit to using reusable bags and containers.', 40),
      (4, 'Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
      (5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

      INSERT INTO Quest (quest_id, title, description, points) VALUES
      (1, 'Abyssal Cleanup Crusade', 'Remove ocean plastic to restore marine balance.', 150),
      (2, 'Verdant Oasis Initiative', 'Plant trees in deforested lands for biodiversity.', 100),
      (3, 'Solar Havens Establishment', 'Set up renewable energy in a remote village.', 180),
      (4, 'Urban Eden Creation Endeavor', 'Transform urban areas with green spaces and trees.', 160),
      (5, 'Industrial Emissions Surveillance', 'Deploy devices to monitor and control industrial emissions for cleaner air.', 180),
      (6, 'E-Waste Repurposing Quest', 'Establish an e-waste center for electronic repurposing.', 160),
      (7, 'Guardians of the Vanishing Species', 'Protect endangered species and their habitat.', 200),
      (8, 'Zero-Waste Revolution', 'Make an edvertisement for zero waste in the community.', 140),
      (9, 'BreathePure Advocacy', 'Improve air quality in a polluted city.', 180),
      (10, 'Sustainable Harvest Expedition', 'Introduce sustainable farming in a rural area.', 150);

      INSERT INTO Rankings (rank_id, ranking, min_points) VALUES
      (1, 'unranked', 0),
      (2, 'bronze', 240),
      (3, 'silver', 540),
      (4, 'gold', 860),
      (5, 'platinum', 1220),
      (6, 'diamond', 1600);
  `;
  pool.query(SQLSTATEMENT, callback);
  }
});