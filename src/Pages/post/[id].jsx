import { createResource, For, Show } from "solid-js";
import { GridSkelton, Skelton } from "components/Loading";
import {client} from "@/Utils";
function RelatedPosts(props) {
  const posts=[];

  searchStore.searchString="";
  return (
    <>
      <ul className="ml-4 space-y-1 list-disc">

        {/*<For each={posts()} fallback={()=><Skelton/>}>*/}
        {/*  {(post) => (*/}
        {/*    <li>*/}
        {/*      <a*/}
        {/*        rel="noopener noreferrer"*/}
        {/*        href={`/posts/${post.id}`}*/}
        {/*        className="hover:underline"*/}
        {/*      >*/}
        {/*        {post.title}*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*  )}*/}
        {/*</For>*/}
      </ul>
    </>
  );
}

function PostComment(props) {
  return (
    <>
      <div className="ml-1 space-y-1 ">
        <div className="text-green-700 font-bold">By Artis</div>
        <div className="px-3 "> {props.comment}</div>
      </div>
    </>
  );
}

function Tag(props) {
  return (
    <>
      <a
        rel="noopener noreferrer"
        href={`/tag/${props.name}`}
        className="px-3 py-1 rounded-sm hover:underline dark:bg-violet-400 dark:text-gray-900"
      >
        {props.name}
      </a>
    </>
  );
}

function Post(props) {
  return (
    <>
      <div className="   dark:bg-gray-800 max-w-6xl px-6 py-16 mx-auto space-y-12">
        <article className="  flex-col space-y-8 dark:bg-gray-800 dark:text-gray-50">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
              {props.post.fields.title || "Post title"}
            </h1>
            <div>
              <summary>{props.post.fields.excerpt}</summary>
            </div>
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
              <div className="flex items-center md:space-x-2">
                <img
                  src="https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
                <p className="text-sm">
                   Leroy Jenkins • July 19th, 2021
                </p>
              </div>
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                4 min read • 1,570 views
              </p>
            </div>
          </div>
          <div>
            <img src={props.post.fields.featuredImage.fields.file.url} />
          </div>
          <div className="dark:text-gray-100">
            <p>
              {props.post.fields.content || "Insert the actual text content here..."}
            </p>
          </div>
        </article>
        <div>
          <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-gray-400">

          </div>
          <div className="space-y-2 text-white">
            <h4 className="text-lg  font-semibold">Comments</h4>

            {/*<PostComment comment={props.post.userComments[0].body} />*/}
          </div>
          <div className="space-y-2 mt-3 text-white">
            <h4 className="text-lg  font-semibold">Related posts</h4>
            {/*<RelatedPosts tag={props.post.tag} />*/}
          </div>
        </div>
      </div>
    </>
  );
}

export default function SinglePost(props) {
  const [myPost] = createResource(() =>
 client.getEntry(props.id)
      .then((data) => {
        return data;
      })
  );
  return (
    <>
      <div>
        <Show when={myPost()?.fields}  fallback={()=><span className=""><GridSkelton/></span>}>
          {<Post post={myPost()} fallback={<div>I am looking for it</div>} />}
        </Show>
      </div>{" "}
    </>
  );
}
