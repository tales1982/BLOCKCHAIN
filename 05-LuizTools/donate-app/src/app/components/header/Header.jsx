import { Nav, H1, H2,Title_img, Img, Div_Paragraphe ,Paragraphe } from "./styles";

const Header = () => (
  <Nav>
    <Title_img>
        <Img src="./icon/logo.png" alt="My logo" />
      <H1>United by Hope, Transforming Lives with Solidarity</H1>
    </Title_img>
    <Div_Paragraphe>
      <H2>Donate Now</H2>
      <Paragraphe>
        Your donation has the power to transform lives. With your help, we can
        bring hope, care, and essential resources to those who need it most.
        Every contribution, big or small, makes a huge difference. Join us in
        this mission of love and solidarity, and help us build a better future
        for everyone.
      </Paragraphe>
    </Div_Paragraphe>
  </Nav>
);

export default Header;
