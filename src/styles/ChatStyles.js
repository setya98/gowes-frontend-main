import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #fff;
`;

export const CardStyles = styled.TouchableOpacity`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 20px;
  margin-top: 20px;
`;

export const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImageView = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #595959;
`;
