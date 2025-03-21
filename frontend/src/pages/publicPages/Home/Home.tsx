import { Layout } from "../../../components";

const Home = () => {
    return (
        <Layout>
        <div className="p-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao Todo-list!</h1>
        <p className="mt-2">
          Organize suas tarefas de forma simples e eficiente. Faça <a className="bg-gray-800 text-white py-0.5 px-1 rounded" href="./login">login</a> ou <a className="bg-gray-800 text-white py-0.5 px-1 rounded" href="./register">registre-se</a> para começar.
        </p>
        </div>
      </Layout>
    )
};

export default Home;