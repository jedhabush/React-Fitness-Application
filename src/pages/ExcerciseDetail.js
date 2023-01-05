import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { fetchData, exerciseOptions, youtubeOptions } from "../utils/fetchData";
import SimilarExercises from "../components/SimilarExercises";
import ExerciseVideos from "../components/ExerciseVideos";
import Detail from "../components/Detail";

const ExcerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercies, setTargetMuscleExercies] = useState([]);
  const [equipmentExercies, setEquipmentExercies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExerciesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setTargetMuscleExercies(targetMuscleExerciesData);

      const equimentExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );
      setEquipmentExercies(equimentExercisesData);
    };
    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail)
    return <div>No Data OR API Requests has been exceeded</div>;
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercies={targetMuscleExercies}
        equipmentExercies={equipmentExercies}
      />
    </Box>
  );
};

export default ExcerciseDetail;
