import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getClassFinalGrades, getStudentFinalGrades } from '../../../redux/gradesRelated/gradesActions';
import Popup from '../../../components/Popup';

const FinalGrades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classId, studentId } = useParams();

  const { finalGrades, loading, error } = useSelector(state => state.grades);

  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (classId) {
      dispatch(getClassFinalGrades(classId));
    } else if (studentId) {
      dispatch(getStudentFinalGrades(studentId));
    }
  }, [dispatch, classId, studentId]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setShowPopup(true);
    }
  }, [error]);

  return (
    <Container>
      <Header>
        <h2>Final Grades</h2>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </Header>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <GradesTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Final Grade</th>
            </tr>
          </thead>
          <tbody>
            {finalGrades.map((record, index) => (
              <tr key={index}>
                <td>{record.studentName}</td>
                <td>{record.rollNum}</td>
                <td>{record.finalGrade}</td>
              </tr>
            ))}
          </tbody>
        </GradesTable>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default FinalGrades;

const Container = styled.div`
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #333;
    font-size: 1.5rem;
  }
`;

const BackButton = styled.button`
  background-color: #4ECDC4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45B7AA;
  }
`;

const LoadingMessage = styled.div`
  color: #333;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const GradesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;

  th, td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: #f4f4f9;
    color: #333;
  }

  td {
    color: #333;
  }
`;