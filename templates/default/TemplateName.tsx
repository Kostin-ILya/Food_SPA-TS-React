import cl from './TemplateName.module.scss'

export interface TemplateNameProps {}

export const TemplateName = ({}: TemplateNameProps) => {
  return <div className={cl.templateName}>TemplateName</div>
}
