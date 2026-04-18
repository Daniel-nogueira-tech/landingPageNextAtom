import React from 'react'
import './Plans.css'

const Plans = () => {
    return (
        <div className='container-plans'>
            <h1>Escolha o plano ideal para você</h1>

            <div className='plans-container'>

                <div className='plan-card'>
                    <h2>Plano Free</h2>
                    <p>Comece sem custos e explore o básico da plataforma:</p>
                    <ul>
                        <li>Acesso a artigos educativos</li>
                        <li>Notícias atualizadas do mercado</li>
                        <li>Participação no fórum da comunidade</li>
                    </ul>
                    <button className='btn-primary'>Começar grátis</button>
                </div>

                <div className='plan-card'>
                    <h2>Plano Pro</h2>
                    <p>Para quem quer evoluir e se aprofundar no mercado:</p>
                    <ul>
                        <li>Todos os recursos do plano Free</li>
                        <li>Cursos completos e práticos</li>
                        <li>Conteúdos exclusivos para membros</li>
                        <li>Aprendizado estruturado para consistência</li>
                    </ul>
                    <p>Preço: R$ 49,90/mês</p>
                    <button className='btn-primary'>Assinar Pro</button>
                </div>

                <div className='plan-card'>
                    <h2>Plano Premium</h2>
                    <p>O máximo de poder para decisões mais inteligentes:</p>
                    <ul>
                        <li>Todos os benefícios do plano Pro</li>
                        <li>Algoritmos avançados de análise</li>
                        <li>Ferramentas para tomada de decisão</li>
                        <li>Insights estratégicos para melhorar resultados</li>
                    </ul>
                    <p>Preço: R$ 99,90/mês</p>
                    <button className='btn-primary'>Ir para Premium</button>
                </div>

            </div>
        </div>
    )
}

export default Plans