import React, { useState } from "react";
import BuckshotRoulette from "./components/BuckshotRoulette/BuckshotRoulette";
import Modal from "./components/Modal/Modal";
import "./App.css"; // Załaduj style

const App = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGameEnd = () => {
    setIsGameOver(true);
    showModal("Round Ends :)");
  };

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <h1>Buckshot Roulette</h1>
      <h3>Propability Calculator v. 1.1</h3>
      <BuckshotRoulette onGameEnd={handleGameEnd} showModal={showModal} />
      {isModalVisible && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
