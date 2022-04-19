import './App.scss';
import { useLinks } from './behaviors/use-links';
import { CreateLinkForm } from './components/CreateLinkForm';
import { LinkListItem } from './components/LinkListItem';

function App() {
  const { data: links, mutate } = useLinks();

  return (
    <div className="App w-full h-screen bg-gray-100 pt-8">
      <div className="bg-white p-3 w-full max-w-2xl mx-auto flex flex-col">
        <CreateLinkForm />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center">Shortened URLs</h2>
          <ul>
            {links?.length ? (
              links.map((link) => (
                <LinkListItem
                  link={link}
                  onRemove={(link) => {
                    const next = [...links];
                    const index = next.indexOf(link) || -1;

                    if (index >= 0) {
                      next.splice(index, 1);
                      mutate([...next]);
                    }
                  }}
                />
              ))
            ) : (
              <li>You don't have any shortened links yet!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
