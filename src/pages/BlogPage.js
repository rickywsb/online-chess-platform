import React from 'react';
import './BlogPage.css'; // Import the CSS file here


const BlogPage = () => {
  const blogs = [
    {
      title: "The Evolution of Chess Strategies",
      description: "A deep dive into how chess strategies have evolved from the classical era to the modern day.",
      date: "November 20, 2023",
      author: "Gucen & GPT-4",
      image: "https://images.squarespace-cdn.com/content/v1/5b6d9e293c3a5376307bb442/1625529460638-8GAMDLNDXPSVI16ACJEY/The+Royal+Board+Game+of+Ur+-+Senet.jpg?format=2500w",
      content: "Chess strategies have evolved significantly over the centuries. From the classical era, where development and control of the center were paramount, to the hypermodern era, where control of the center from a distance and pawn structures took precedence, the evolution of chess strategy is a fascinating study of adaptation and innovation."
    },
    {
      title: "5 Essential Openings Every Beginner Should Know",
      description: "Starting your chess journey? Here are five openings that you should learn first.",
      date: "October 15, 2023",
      author: "Gucen & GPT-4",
      image: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/davidkaufmann/phpYXrdtu.jpeg",
      content: "For beginners, understanding and learning chess openings can be a daunting task. However, there are a few key openings that can provide a solid foundation for your chess journey. These include the Italian Game, the Sicilian Defense, the French Defense, the Queen's Gambit, and the Spanish Game."
    },
    {
      title: "Interview with Grandmaster Jane Doe",
      description: "An exclusive interview with Grandmaster Jane Doe, discussing her career and tips for upcoming players.",
      date: "September 5, 2023",
      author: "Gucen & GPT-4",
      image: "https://sandpipercomms.com/wp-content/uploads/2021/10/Mics-960x627-1.jpg",
      content: "In our exclusive interview, Grandmaster Jane Doe shares insights from her illustrious career. From her early beginnings to her rise to the top, Jane discusses the challenges she faced, her training regimen, and her advice for upcoming players. 'Chess is a journey,' she says, 'Enjoy the process and the results will follow.'"
    },
    {
      title: "The Impact of AI on Chess",
      description: "Exploring how artificial intelligence has changed the way we play and understand chess.",
      date: "August 30, 2023",
      author: "Gucen & GPT-4",
      image: "https://community.thriveglobal.com/wp-content/uploads/2021/09/maxresdefault-1.jpg",
      content: "Artificial intelligence has had a profound impact on the game of chess. With the advent of powerful chess engines like Stockfish and AlphaZero, players now have resources that can analyze millions of positions per second. This has not only changed the way players prepare and study the game, but also our understanding of the game itself."
    },
    {
      title: "The Psychology of Chess",
      description: "Understanding the mental aspects of chess and how it affects player performance.",
      date: "August 15, 2023",
      author: "Gucen & GPT-4",
      image: "https://www.azquotes.com/picture-quotes/quote-psychology-is-the-most-important-factor-in-chess-alexander-alekhine-76-59-63.jpg",
      content: "Chess is not just a game of strategy and tactics, but also one of psychology. Understanding your opponent's mindset, managing your own emotions, and maintaining focus during long games are all crucial aspects of the game that often get overlooked."
    },
    {
      title: "The History of Chess",
      description: "A look back at the origins and evolution of chess through the centuries.",
      date: "August 1, 2023",
      author: "Gucen & GPT-4",
      image: "https://images.chesscomfiles.com/proxy/d1lalstwiwz2br.cloudfront.net/images_users/tiny_mce/pete/phpUyHPWf/http/bce6da0352.jpeg",
      content: "Chess has a rich history that dates back over a thousand years. Originating in India, the game spread to Persia and the Islamic world, before reaching Europe. Over the centuries, the rules evolved to the modern form of the game we know today."
    }
  ];
  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <p>Welcome to our chess blog! Here you can find articles and news.</p>
      <div>
        {blogs.map((blog, index) => (
          <div key={index} className="blog-post">
            <h2>{blog.title}</h2>
            <img src={blog.image} alt={blog.title} />
            <p><em>Published on: {blog.date}</em></p>
            <p><em>Written by: {blog.author}</em></p>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;