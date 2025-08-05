import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;
    const heroImage = entry.getIn(["data", "hero_image"]);
    const imageElement = heroImage
      ? html`<img src=${heroImage} alt="Hero image" style="max-width: 100%; margin-bottom: 1rem;" />`
      : null;

    return html`
      <main>
        <article>
          <h1>${entry.getIn(["data", "title"], null)}</h1>
          <p>
            <small>
              <time>
                ${format(
                  new Date(entry.getIn(["data", "date"])),
                  "dd MMM, yyyy"
                )}
              </time>
              ${" by " + entry.getIn(["data", "author"], "Anonymous")}
            </small>
          </p>

          ${imageElement}

          <p>${entry.getIn(["data", "summary"], "")}</p>

          ${this.props.widgetFor("body")}

          <p>
            ${entry.getIn(["data", "tags"], []).map(
              (tag) => html`<a href="#" rel="tag">${tag}</a>`
            )}
          </p>
        </article>
      </main>
    `;
  },
});

export default Post;
