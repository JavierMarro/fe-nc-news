import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((data) => {
        if (topic !== undefined) {
          const filteredArticles = data.filter((filteredTopic) => {
            return filteredTopic.topic === topic;
          });
          setArticles(filteredArticles);
          setLoading(false);
        } else {
          setArticles(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [topic]);

  if (loading) {
    return (
      <>
        <h2 className="loading">Loading some articles for you...</h2>
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
  if (error) {
    return (
      <>
        <h2 className="loading">Oh no! Something went wrong...</h2>
        <div className="lottie-gif">
          <DotLottieReact
            src="https://lottie.host/c0663d83-27a8-4aa9-9279-84e3445e78a7/z7fWPxOZrY.json"
            loop
            autoplay
          />
        </div>
      </>
    );
  }

  return (
    <main>
      <Container>
        <h2 className="my-4">News Articles</h2>
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {articles.map((article, index) => {
            return (
              <Col key={index}>
                <ArticleCard article={article} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default Home;
