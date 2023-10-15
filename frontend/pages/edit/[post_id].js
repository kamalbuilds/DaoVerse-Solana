import Editor from "../../components/forum/Editor";
import Header from '../../components/forum/Header';
import Hero from '../../components/forum/Hero';
// @ts-ignore
import Sidebar from '../../components/forum/Sidebar';
import Footer from '../../components/forum/Footer';
import { Orbis, useOrbis, User } from "@orbisclub/components";

export default function Edit({post}) {
  const { orbis, user, setConnectModalVis } = useOrbis();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip bg-main">
      <div className="antialiased">
        <div className="min-h-screen flex">

          {/*  Page content */}
          <main className="grow overflow-hidden px-6">
            {/*  Site header */}
            <Header />
            <Hero title="Edit your post:" />

            {/* Page content */}
            <section>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="md:flex md:justify-between">

                  {/* Show post editor or connect button */}
                  <div className="md:grow pt-0 pb-12 pr-10">
                    {user ?
                      <Editor post={post} />
                    :
                      <div className="w-full text-center bg-slate-50 rounded border border-primary p-6">
                        <p className="text-base text-secondary mb-2">You must be connected to share a post in this forum.</p>
                        <button className="btn-sm py-1.5 bg-main bg-main-hover" onClick={() => setConnectModalVis(true)}>Connect</button>
                      </div>
                    }
                  </div>
                  <Sidebar />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

/** Load content for Blog */
Edit.getInitialProps = async (context) => {
  let orbis_server = new Orbis({
    useLit: false
  });
  let { data, error } = await orbis_server.getPost(context.query.post_id);
  /** Return results */
  return {
    post_id: context.query.post_id,
    post: data ? data : null
  };
}
