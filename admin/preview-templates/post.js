import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    // SAFELY FORMAT THE DATE
    let formattedDate = "Unknown date";
    try {
      const rawDate = entry.getIn(["data", "date"]);
      if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
          formattedDate = format(parsedDate, "dd MMM, yyyy");
        }
      }
    } catch (e) {
      console.error("Error formatting date:", e);
    }

    return html`
      <main>
        <article>
          <h1>${entry.getIn(["data", "title"], null)}</h1>
          <p>
            <small>
              <time>${formattedDate}</time>
              ${" by Author"}
            </small>
          </p>

          <p>${entry.getIn(["data", "summary"], "")}</p>

          ${this.props.widgetFor("body")}
          <p>
            ${
              entry.getIn(["data", "tags"], []).map(
                tag =>
                  html`<a href="#" rel="tag">${tag}</a>`
              )
            }
          </p>
        </article>
      </main>
    `;
  }
});

export default Post;
