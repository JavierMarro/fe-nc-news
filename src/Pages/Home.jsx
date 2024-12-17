import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <>
        <h2>Loading some articles for you...</h2>
        <div className="lottie-gif">
          <DotLottieReact
            src="https://lottie.host/a2174cc3-398a-4a89-a109-44f83698dc6c/wfonPPPWwq.json"
            loop
            autoplay
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Container>
        <h2 className="my-4">News Articles</h2>
        <Row xs={1} sm={2} className="row-style">
          {articles.map((article, index) => {
            return (
              <Col key={index}>
                <ArticleCard article={article} />
              </Col>
            );
          })}
        </Row>
      </Container>
      {error && <p>Oh no! Something went wrong...</p>}
    </>
  );
};

export default Home;
