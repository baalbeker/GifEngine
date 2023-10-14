/**
Returns a HTML string representing the About view of the app.
@function
@returns {string} HTML string.
*/
export const toAboutView = () => `
<div id="about">
  <div class="content">
    <h1>About the app</h1>
    <h2>Authors: Team12 </h2>
    <h2>Date: April 2023</h2>
    <img src="images/team.png" alt="Team 12 logo" onclick="this.src='images/water.gif'">
  </div>
</div>
`;

