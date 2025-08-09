export default async function () {
    try {
      const response = await fetch('https://note.com/api/v2/creators/toshiyuki_life/contents?kind=note&page=1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }