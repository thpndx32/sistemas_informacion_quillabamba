import styled from "styled-components";

export const Circle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props?.color}
`;