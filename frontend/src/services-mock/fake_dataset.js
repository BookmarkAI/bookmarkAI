


const chat_history = [
  {
    q: "Can you write a paragraph about design?", 
    a: "Design is the art of crafting purposeful and aesthetic solutions that blend form and function harmoniously. It is a multidimensional discipline that permeates various aspects of our lives, from architecture and product development to graphic design and user interfaces. Good design transcends mere visual appeal; it is rooted in thoughtful intention, meticulous planning, and a deep understanding of the needs and desires of the intended audience. It seeks to solve problems, enhance experiences, and evoke emotions. Design is a powerful tool that shapes the world around us, influencing how we interact with our environment and how we perceive the world. Whether it's the sleek lines of a modern building, the intuitive layout of a mobile app, or the elegant simplicity of a well-designed logo, design enriches our lives and sparks our imagination.",
  },
  {
    q: "javascript string notation when using variable ",
    a: "When using a variable within a JavaScript string, you have a few options depending on your specific requirements:"
  },
  {
    q: "i am using material ui and react to build a web app. i am displaying files from folders and users can select on folder from list of folders. Once a user clicks on a folder button, it changes color. When the user click on another folder button, that one get selected & changes color and the one that was clicked before get automatically unclicked. Essentially, it's a single choice list of buttons. How do i code the ui?",
    a: "To implement a single choice list of buttons in React and Material-UI, you can use the state to keep track of the selected folder and update the button styles accordingly. Here's an example:"
  }
]

const folders = [ "Unsorted", "Project 1", "Project 2", "Project 3"]

const bookmarks = [
    {
     url: "https://www.netguru.com/blog/generative-ai-startups",
     title: "31 Remarkable Generative AI Startups You Simply Can't Ignore",
     folder: "Project 1"
    },

    {
     url: "https://blog.enterprisedna.co/how-to-use-chat-gpt/",
     title: "How To Use Chat GPT: A Simple Guide For Beginners",
     folder: "Project 2"
    },
    {
      url: "https://arstechnica.com/tech-policy/2023/03/fake-ai-generated-images-imagining-donald-trumps-arrest-circulate-on-twitter/",
      title: "AI-faked images of Donald Trump’s imagined arrest swirl on Twitter",
      folder: "Unsorted"
    },

    {
      url: "https://hbr.org/2022/11/how-generative-ai-is-changing-creative-work",
      title: "How Generative AI Is Changing Creative Work",
      folder: "Unsorted"
    },

    {
      url: "https://www.forbes.com/sites/bernardmarr/2023/05/31/the-future-of-generative-ai-beyond-chatgpt/?sh=b97322c3da9a",
      title: "The Future Of Generative AI Beyond ChatGPT",
      folder: "Project 2"
    },
    {
      url: "https://www.sfchronicle.com/sf/article/sfnext-poll-sentiment-17435794.php",
      title: "How fed up are San Franciscans with the city's problems? New S.F. Chronicle poll finds pervasive gloom",
      folder: "Project 3"
    },
    {
      url: "https://www.tastingtable.com/1303053/best-restaurants-san-francisco-ranked/",
      title: "40 Absolute Best Restaurants In San Francisco, Ranked",
      folder: "Project 3"
    },
  {
    url: "https://github.com/lancedb/lancedb",
    title: "lancedb/lancedb: Developer-friendly, serverless vector database for AI applications",
    folder: "Project 2"
  },
  {
    url: "https://lancedb.com/",
    title: "LanceDB",
    folder: "Project 1"
  },
  {
    url: "https://lancedb.github.io/lancedb/",
    title: "LanceDB Documentation",
    folder: "Project 1"
  }
]



export {bookmarks, folders, chat_history}

