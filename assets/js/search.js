const summaryInclude = 60;
const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.0,
  tokenize: true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: 'title', weight: 0.8 },
    { name: 'contents', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'categories', weight: 0.3 },
  ],
};

const searchQuery = param('s');
if (searchQuery) {
  $('#search-query').val(searchQuery);
  executeSearch(searchQuery);
} else {
  $('#search-results').append('<p>Please enter a word or phrase above</p>');
}

function executeSearch(searchQuery) {
  $.getJSON('/index.json', data => {
    const pages = data;
    const fuse = new Fuse(pages, fuseOptions);
    const result = fuse.search(searchQuery);
    if (result.length > 0) {
      populateResults(result);
    } else {
      $('#search-results').append('<p>No matches found</p>');
    }
  });
}

function populateResults(result) {
  $.each(result, (key, value) => {
    const { contents } = value.item;
    let snippet = '';
    const snippetHighlights = [];
    if (fuseOptions.tokenize) {
      snippetHighlights.push(searchQuery);
    } else {
      $.each(value.matches, (matchKey, mvalue) => {
        if (mvalue.key === 'tags' || mvalue.key === 'categories') {
          snippetHighlights.push(mvalue.value);
        } else if (mvalue.key === 'contents') {
          const start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
          const end =
            mvalue.indices[0][1] + summaryInclude < contents.length
              ? mvalue.indices[0][1] + summaryInclude
              : contents.length;
          snippet += contents.substring(start, end);
          snippetHighlights.push(
            mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1),
          );
        }
      });
    }

    if (snippet.length < 1) {
      snippet += contents.substring(0, summaryInclude * 2);
    }
    // pull template from hugo templarte definition
    const templateDefinition = $('#search-result-template').html();
    // replace values
    const output = render(templateDefinition, {
      key,
      title: value.item.title,
      link: value.item.permalink,
      tags: value.item.tags,
      author: value.item.author,
      date: value.item.dates,
      categories: value.item.categories,
      snippet,
    });
    $('#search-results').append(output);

    $.each(snippetHighlights, (snipkey, snipvalue) => {
      $(`#summary-${key}`).mark(snipvalue);
    });
  });
}

function param(name) {
  return decodeURIComponent((location.search.split(`${name}=`)[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function render(templateString, data) {
  let conditionalMatches;
  const conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  // since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  let copy = templateString;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if (data[conditionalMatches[1]]) {
      // valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      // not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], '');
    }
  }
  for (const key in data) {
    copy = copy.replace(new RegExp(`\\$\\{\\s*${key}\\s*\\}`, 'g'), data[key]);
    if (key === 'date') {
      copy = copy.replace(
        new RegExp('\\$\\{\\s*dateFmt\\s*\\}', 'g'),
        new Date(data[key]).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        data[key],
      );
    }
  }
  return copy;
}
