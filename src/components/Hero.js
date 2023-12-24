import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { breeds } from "../constants/breed_list";
import dogFace from "../assets/img/dogTiltHeadLeft.jpg";
import { BiSolidBone, BiSearch } from "react-icons/bi";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("Dog");
  const [barking, setBarking] = useState(null);
  const [image, setImage] = useState("");
  const [breedName, setBreedName] = useState("");
  const [trainability, setTrainability] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [coatLength, setCoatLength] = useState(null);
  const [drooling, setDrooling] = useState(null);
  const [goodWithKids, setGoodWithKids] = useState(null);
  const [goodWithDogs, setGoodWithDogs] = useState(null);
  const [goodWithStrangers, setGoodWithStrangers] = useState(null);
  const [maxHeight, setMaxHeight] = useState(null);
  const [minHeight, setMinHeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(null);
  const [minWeight, setMinWeight] = useState(null);
  const [playfulness, setPlayfulness] = useState(null);
  const [grooming, setGrooming] = useState(null);
  const [minLife, setMinLife] = useState(null);
  const [maxLife, setMaxLife] = useState(null);
  const [shedding, setShedding] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const selectedBreed = getBreed(searchInput);
    setSelectedBreed(selectedBreed);
    console.log(`Selected Breed: ${selectedBreed}`);
    // setSearchInput("");
  };

  const onSearch = (searchTerm) => {
    setSearchInput(searchTerm);
  };

  const getBreed = (breedName) => {
    const sanitizedInput = breedName.trim().toLowerCase();
    const foundBreed = breeds.find((breed) =>
      breed.toLowerCase().includes(sanitizedInput)
    );
    return foundBreed || console.log("Breed not found");
  };

  const getToken = async () => {
    const url = "https://api.petfinder.com/v2/oauth2/token";

    try {
      const response = await axios.post(url, {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_PETFINDER_CLIENT_ID,
        client_secret: process.envREACT_APP_PETFINDER_CLIENT_SECRET,
      });

      // Access Token
      const token = response.data.access_token;
      setAccessToken(token);
      return token;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const getRescue = async (breedName) => {
    try {
      // Create a Google search URL with the breedName and "rescue"
      console.log(breedName);
      const searchQuery = breedName.replace(/ /g, "+") + "+rescue";
      const googleSearchUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${apiKey}&cx=841739f09b80547c9&q=${searchQuery}`;

      // Perform the Google search
      const searchResponse = await axios.get(googleSearchUrl);

      // Check if there are items in the response data
      if (searchResponse.data.items && searchResponse.data.items.length > 0) {
        // Extract the top search result URL
        const topResultUrl = searchResponse.data.items[0].link;

        // Use the top result URL in your application (e.g., open it in a new tab)
        window.open(topResultUrl, "_blank");
      } else {
        console.error("No search results found.");
      }
    } catch (error) {
      console.error("Error performing Google search:", error);
    }
  };

  function renderBones(value) {
    const bones = [];
    for (let i = 0; i < value; i++) {
      bones.push(<BiSolidBone key={i} />);
    }
    return bones;
  }

  const getRandomBreed = () => {
    const randomIndex = Math.floor(Math.random() * breeds.length);
    const randomBreed = breeds[randomIndex];

    setSelectedBreed(randomBreed);
  };

  const fetchDogInfo = () => {
    if (!selectedBreed) {
      return;
    }
    setLoading(true);
    setImageLoading(true);
    const name = selectedBreed;
    const apiKey = process.env.REACT_APP_DOG_API_KEY;
    const url = `https://api.api-ninjas.com/v1/dogs?name=${name}`;

    axios
      .get(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      })
      .then((response) => {
        const responseIndex = Math.floor(Math.random() * response.data.length);
        const data = response.data;
        console.log(data);
        if (response.data.length === 1) {
          setBarking(data[0].barking);
          setImage(data[0].image_link);
          setBreedName(data[0].name);
          setTrainability(data[0].trainability);
          setEnergy(data[0].energy);
          setCoatLength(data[0].coat_length);
          setDrooling(data[0].drooling);
          setGoodWithKids(data[0].good_with_children);
          setGoodWithDogs(data[0].good_with_other_dogs);
          setGoodWithStrangers(data[0].good_with_strangers);
          setMaxHeight(data[0].max_height_male);
          setMinHeight(data[0].min_height_male);
          setMaxWeight(data[0].max_weight_male);
          setMinWeight(data[0].min_weight_male);
          setPlayfulness(data[0].playfulness);
          setGrooming(data[0].grooming);
          setMinLife(data[0].min_life_expectancy);
          setMaxLife(data[0].max_life_expectancy);
          setShedding(data[0].shedding);
        }
        if (response.data.length > 1) {
          setBarking(data[responseIndex].barking);
          setImage(data[responseIndex].image_link);
          setBreedName(data[responseIndex].name);
          setTrainability(data[responseIndex].barking);
          setEnergy(data[responseIndex].energy);
          setCoatLength(data[responseIndex].coat_length);
          setDrooling(data[responseIndex].drooling);
          setGoodWithKids(data[responseIndex].good_with_children);
          setGoodWithDogs(data[responseIndex].good_with_other_dogs);
          setGoodWithStrangers(data[responseIndex].good_with_strangers);
          setMaxHeight(data[responseIndex].max_height);
          setPlayfulness(data[responseIndex].playfulness);
          setMinHeight(data[responseIndex].min_height_male);
          setMaxHeight(data[responseIndex].max_height_male);
          setMaxWeight(data[responseIndex].max_weight_male);
          setMinWeight(data[responseIndex].min_weight_male);
          setGrooming(data[responseIndex].grooming);
          setMinLife(data[responseIndex].min_life_expectancy);
          setMaxLife(data[responseIndex].max_life_expectancy);
          setShedding(data[responseIndex].shedding);
        }
        setImageLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error:", error.response.status, error.response.data);
        } else {
          console.error("Request failed:", error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedBreed) {
      fetchDogInfo();
    }
  }, [selectedBreed]);

  return (
    <Wrapper>
      <div className="title-div">
        <div className="logo">
          <h1>
            Daily <span>Dog</span>
          </h1>
        </div>
        <div className="random-btn">
          <button className=" btn btn-random" onClick={getRandomBreed}>
            Random
          </button>
        </div>
        <div className="main-search-container">
          <div className="searchbar-container">
            <form onSubmit={handleSubmit}>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search Dog Breed..."
                  className="input"
                  onChange={handleChange}
                  value={searchInput}
                />
                <button
                  type="submit"
                  className="btn btn-search"
                  onClick={handleSubmit}
                >
                  <BiSearch />
                </button>
              </div>
              <div className="dropdown">
                {breeds
                  .filter((breed) => {
                    const searchTerm = searchInput.toLowerCase();
                    const breedName = breed.toLowerCase();

                    return (
                      searchTerm &&
                      breedName.startsWith(searchTerm) &&
                      breedName !== searchTerm
                    );
                  })
                  .map((breed) => (
                    <div
                      onClick={() => onSearch(breed)}
                      className="dropdown-row"
                      key={breed}
                    >
                      {breed}
                    </div>
                  ))}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="info">
          <div className="photo">
            {!selectedBreed && !loading && <img src={dogFace} alt="dogface" />}
            {imageLoading && <div className="loading"></div>}

            {!imageLoading && selectedBreed && (
              <img src={image} alt="image" className="dog-img" />
            )}
          </div>
          <div className="stats">
            <p>Breed: {selectedBreed && <span>{breedName}</span>}</p>
            <p>
              Barking: {selectedBreed && <span>{renderBones(barking)}</span>}
            </p>
            <p>Energy: {selectedBreed && <span>{renderBones(energy)}</span>}</p>
            <p>
              Playfulness:{" "}
              {selectedBreed && <span>{renderBones(playfulness)}</span>}
            </p>
            <p>
              Trainability:{" "}
              {selectedBreed && <span>{renderBones(trainability)}</span>}
            </p>
            <p>
              Coat Length:
              {selectedBreed && <span>{renderBones(coatLength)}</span>}
            </p>
            <p>
              Shedding:
              {selectedBreed && <span>{renderBones(shedding)}</span>}
            </p>
            <p>
              Grooming:
              {selectedBreed && <span>{renderBones(grooming)}</span>}
            </p>
            <p>
              Coat Length:
              {selectedBreed && <span>{renderBones(coatLength)}</span>}
            </p>
            <p>
              Drooling:
              {selectedBreed && <span>{renderBones(drooling)}</span>}
            </p>
            <p>
              Height:
              {selectedBreed && (
                <span>
                  {minHeight}" - {maxHeight}"
                </span>
              )}
            </p>
            <p>
              Weight:
              {selectedBreed && (
                <span>
                  {minWeight} - {maxWeight} lbs
                </span>
              )}
            </p>
            <p>
              Good With Dogs:
              {selectedBreed && <span>{renderBones(goodWithDogs)}</span>}
            </p>
            <p>
              Good With Kids:
              {selectedBreed && <span>{renderBones(goodWithKids)}</span>}
            </p>
            <p>
              Good With Strangers:
              {selectedBreed && <span>{renderBones(goodWithStrangers)}</span>}
            </p>
            <p>
              Average Lifespan:
              {selectedBreed && (
                <span>
                  {minLife} - {maxLife} years
                </span>
              )}
            </p>
            <button className="btn" onClick={() => getRescue(breedName)}>
              Find Rescue
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  .btn-random {
    background-color: var(--clr-primary-5);
    margin-right: 5px;
  }

  .btn-random:hover {
    background-color: var(--clr-primary-3);
    transition: var(--transition);
  }

  .btn-search {
    width: 32px;
    height: 32px;
    font-size: larger;
    font-weight: bold;
    padding: 5px;
    background-color: var(--clr-secondary-5);
    color: var(--clr-white);
  }

  .btn-search:hover {
    background-color: var(--clr-secondary-3);
  }

  .dog-face {
    width: 400px;
  }

  .dropdown {
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    position: absolute;
    top: 100%; // Position the dropdown below the input
    left: 0;
    width: 100%;
    max-height: 200px; // Set a fixed height for the dropdown
    overflow-y: auto; // Enable scrolling if there are many items
    z-index: 1; // Ensure the dropdown appears above other content
  }

  .dropdown:empty {
    border: none;
  }

  .dropdown-row {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: lightgray;
    }
  }

  h1 {
    color: var(--clr-primary-5);
  }

  img {
    display: block;
    max-width: 500px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  form {
    display: flex;
    flex-direction: column;
    z-index: 3;
  }

  .info {
    display: flex;
    width: 70%;
    background-color: var(--clr-white);
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  input[type="text"] {
    width: 100%;
    background-color: var(--clr-white);
    border: none;
    /* border-radius: var(--radius); */
  }

  .main {
    height: 100vh;
    width: 100%;
    background-color: var(--clr-primary-5);
    box-sizing: border-box;
    border-top: 2px solid var(--clr-secondary-3);
    display: flex;
    flex-direction: column;
    /* overflow-y: scroll; */
  }

  .main-search-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 280px;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  p {
    color: var(--clr-primary-4);
  }

  p span {
    color: var(--clr-secondary-5);
    margin-left: 5px;
  }

  .photo {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
  }

  .random-btn {
    margin: auto;
  }

  .search {
    display: flex;
  }

  .searchbar-container {
    width: 280px;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    margin: auto;
  }

  h1 span {
    color: var(--clr-secondary-5);
  }

  .stats {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: start;
    padding-bottom: 1.5rem;

    word-wrap: break-word;
  }

  .title-div {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  @media screen and (max-width: 1188px) {
    .btn-random {
      margin-bottom: 10px;
    }

    .info {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 3.25rem;
    }

    .main {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding-bottom: 2rem;
    }

    .main-search-container {
      width: 280px;
      margin-bottom: 0.75rem;
      margin-top: 20px;
    }

    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .searchbar-container {
      width: 280px;
      display: flex;
      flex-direction: column;
      /* position: absolute;
    right: 0;
    bottom: 25%; */
    }

    .title-div {
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .searchbar-container {
      flex-direction: column;
      align-items: center;
    }

    .stats {
      display: flex;
      width: 100%;
      height: auto;
      justify-content: center;
      align-items: center;
      padding-bottom: 3rem;
    }
  }

  /* @media only screen and (max-width: 480px) {
    .main {
      margin-top: 20px !important;

      margin-bottom: 20px !important;
    }
  } */
`;
