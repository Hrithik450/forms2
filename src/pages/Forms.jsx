import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db from "../Config/Firebase";
import DotSpinner from "../components/Spinner_1";
import { Link } from "react-router-dom";

const Forms = () => {
  const [formsArray, setformsArray] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const fetchForms = async () => {
      try {
        const queries = await getDocs(collection(db, "formFormats"));
        const forms = queries.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setloading(false);
        setformsArray(forms);
      } catch (error) {
        console.log("Error fetching forms: ", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <Wrapper>
      <Form>
        {loading ? (
          <DotSpinner />
        ) : (
          <>
            {formsArray.map((form) => (
              <Link to={`form/${form.id}`} key={form.id}>
                <FormCard>
                  <FormData>
                    <FormCardTitle>{form.Title}</FormCardTitle>
                    <P>1 Response - Modified: 01 Dec 2024</P>
                  </FormData>
                </FormCard>
              </Link>
            ))}
          </>
        )}
      </Form>
    </Wrapper>
  );
};

export default Forms;

const Wrapper = styled.section`
  max-height: max-content;
  width: 100%;
`;

const Form = styled.form`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  scrollbar-width: none;
  border-radius: 10px;
  overflow-y: auto;
  height: 100vh;
  max-width: 50%;
  margin: auto;
  padding: 2rem;

  @media (max-width: 450px) {
    border-radius: 0px;
    max-width: 100%;
    padding: 1.2rem;
  }
`;

const FormCard = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: black;
  position: relative;
  padding: 1rem;
  margin: 1.5rem 0;
  height: 40%;

  @media (max-width: 450px) {
    height: 30%;
  }
`;

const FormData = styled.div`
  background-color: white;
  max-height: max-content;
`;

const FormCardTitle = styled.h4`
  position: absolute;
  bottom: 2.2rem;
  max-height: max-content;
  color: white;
`;

const P = styled.p`
  position: absolute;
  bottom: 0;
  max-height: max-content;
  font-size: 14px;
  color: white;
`;
