import styled from "styled-components";

export const Game = styled.li`

    display: flex;
    flex-direction: column;
    align-items: center;

img{
    width: 400px;
    border-radius: 1rem;
    margin-bottom: 1rem;
}
span{
    font-weight: bold;
    font-size: 140%;
}
a{
    transition: all 0.3s;
}
a:hover{
    transform: scale(1.1);
}
`