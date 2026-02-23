import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Clock, Layout } from 'lucide-react';
import { useProjectsStore } from '../store/projectsStore';
import { TEMPLATES } from '../data/templates';
import type { Template } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const { projects, loadProjects, createNewProject, setCurrentProject } = useProjectsStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleNewProject = () => {
    const project = createNewProject('Новый проект', 1080, 1080);
    setCurrentProject(project);
    navigate('/editor');
  };

  const handleOpenProject = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (proj) {
      setCurrentProject(proj);
      navigate('/editor');
    }
  };

  const handleUseTemplate = (template: Template) => {
    const project = createNewProject(template.name, template.width, template.height);
    setCurrentProject({ ...project, thumbnail: template.thumbnail });
    navigate('/editor', { state: { templateId: template.id } });
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const previewTemplates = TEMPLATES.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-sm font-bold">
            AC
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Ad Creative Studio</h1>
            <p className="text-xs text-gray-400">Создавайте рекламные баннеры</p>
          </div>
        </div>
        <button
          onClick={handleNewProject}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <PlusCircle size={16} />
          Новый проект
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* Recent Projects */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">Недавние проекты</h2>
          </div>

          {projects.length === 0 ? (
            <div className="bg-gray-800 border border-dashed border-gray-600 rounded-2xl p-10 text-center">
              <div className="text-gray-500 text-sm mb-4">У вас ещё нет проектов</div>
              <button
                onClick={handleNewProject}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Создать первый проект
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* New project card */}
              <button
                onClick={handleNewProject}
                className="aspect-square bg-gray-800 border-2 border-dashed border-gray-600 hover:border-indigo-500 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-indigo-400 transition group"
              >
                <PlusCircle size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Новый проект</span>
              </button>

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col bg-gray-800 border border-gray-700 hover:border-indigo-500 rounded-xl overflow-hidden transition cursor-pointer"
                  onClick={() => handleOpenProject(project.id)}
                >
                  <div className="aspect-square bg-gray-700 overflow-hidden relative">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Layout size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                        Открыть
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-sm font-medium text-gray-100 truncate">{project.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(project.updatedAt)}</p>
                    <p className="text-xs text-gray-600">{project.width}×{project.height}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Templates */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layout size={18} className="text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">Начать с шаблона</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-indigo-500 transition cursor-pointer"
                onClick={() => handleUseTemplate(template)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-medium text-gray-100 truncate">{template.name}</p>
                  <p className="text-xs text-gray-500">{template.width}×{template.height}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                    Использовать
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
