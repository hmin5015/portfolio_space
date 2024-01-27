/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import styled from "styled-components";

type User = {
  Avartar: string;
  BirthDate: string;
  EmailAddress: string;
  MobileNumber: string;
  UserId: string;
  UserName: string;
  UserStatus: number;
};

const UserFieldSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 25px;
  margin-bottom: 25px;
  font-size: 16px;

  label {
    width: 100px;
    margin-right: 10px;

    span {
      color: #a451f7;
      font-size: 22px;
      margin: 0 5px;
    }
  }

  .input-section {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;

    input {
      width: calc(100% - 95px);
      padding: 0 10px;
    }

    button {
      width: 85px;
      background-color: #ffeb60;
      color: #242424;
      border-radius: 0;
      margin-left: 10px;
      padding: 0 5px;
    }
  }
`;

const ButtonSection = styled.section`
  display: flex;
  padding: 0 25px;
`;

export const Manage = () => {
  const apiGetUrl =
    "https://srtwj8tzu1.execute-api.us-west-1.amazonaws.com/dev/user?UserId=ed18a094-0589-47bf-be16-6b2754421aed";
  const apiPutUrl =
    "https://srtwj8tzu1.execute-api.us-west-1.amazonaws.com/dev/user";
  const { data, error, loading, fetchData } = useAxios();
  const userData: User = data as User;
  const [user, setUser] = useState<User>(
    userData || {
      Avartar: "",
      BirthDate: "",
      EmailAddress: "",
      MobileNumber: "",
      UserId: "",
      UserName: "",
      UserStatus: 0,
    }
  );

  useEffect(() => {
    const fetchDataAndSetUser = async () => {
      await fetchData(apiGetUrl, "GET");
    };

    fetchDataAndSetUser();
  }, [apiGetUrl]);

  useEffect(() => {
    console.log(userData)
    userData && setUser(userData);
  }, [userData]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value as string,
    });
  };

  const handleSaveClick = async () => {
    const saveDataAndSetUser = async () => {
      console.log(user);
      await fetchData(apiPutUrl, "PUT", user);
    };
  
    await saveDataAndSetUser();
    console.log(user)
    alert('성공적으로 저장되었습니다.');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <UserFieldSection>
        <label>
          유저명<span>*</span>
        </label>
        <div className="input-section">
          <input
            type="text"
            name="UserName"
            placeholder="유저명 입력"
            // defaultValue={userData?.UserName}
            value={user?.UserName ?? ""}
            onInput={onInput}
          />
          <button>중복확인</button>
        </div>
      </UserFieldSection>
      <UserFieldSection>
        <label>
          이메일<span>*</span>
        </label>
        <div className="input-section">
          <input
            type="email"
            name="EmailAddress"
            placeholder="이메일 입력"
            // defaultValue={userData?.EmailAddress}
            value={user?.EmailAddress ?? ""}
            disabled={true}
            onInput={onInput}
          />
          <button>수정하기</button>
        </div>
      </UserFieldSection>
      <UserFieldSection>
        <label>
          휴대폰 번호<span>*</span>
        </label>
        <div className="input-section">
          <input
            type="text"
            name="MobileNumber"
            placeholder="유대폰 번호 입력"
            // defaultValue={userData?.MobileNumber}
            value={user?.MobileNumber ?? ""}
            onInput={onInput}
          />
          <button>인증요청</button>
        </div>
      </UserFieldSection>
      <UserFieldSection>
        <label>생년월일</label>
        <div className="input-section">
          <input
            type="text"
            name="BirthDate"
            placeholder="생년월일 입력"
            // defaultValue={userData?.BirthDate}
            value={user?.BirthDate ?? ""}
            onInput={onInput}
          />
          <button>수정하기</button>
        </div>
      </UserFieldSection>
      <ButtonSection>
        <button onClick={handleSaveClick}>저장하기</button>
      </ButtonSection>
    </div>
  );
};
