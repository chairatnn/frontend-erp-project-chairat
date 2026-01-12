export default function AboutUs () {
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 gap-y-6 w-1/2">
      <h2 className="text-4xl font-bold text-center">JSD#11 - Chairat N.</h2>
      <img
        src="myimage.jpg"
        alt="user image"
        className="w-64 rounded-2xl"
      />
      <p className="text-center text-xl">
        <span className="text-2xl font-bold">Fullstack Developer</span>
        <br /><br />I'm a developer who creates impactful digital experiences. With experience in developing responsive websites and skills spanning both frontend and backend, I'm always ready to learn and grow with new technologies.
        <br /><strong className="text-blue-800"><a href="https://sayan-portfolio-chairat.vercel.app" target="_blank">## Link to My Portfolio ##</a>
          </strong>
      </p>
    </div>
  );
}
