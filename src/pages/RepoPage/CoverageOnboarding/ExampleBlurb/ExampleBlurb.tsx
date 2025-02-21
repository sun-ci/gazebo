import A from 'ui/A'

const ExampleBlurb = () => {
  return (
    <div data-testid="example-blurb">
      &#128193; View a{' '}
      <A
        to={{ pageName: 'codecovExampleJSGHAWorkflow' }}
        isExternal
        hook="codecov-workflow-intro"
      >
        GitHub Actions workflow example
      </A>{' '}
      or
      <A
        to={{ pageName: 'codecovExampleJSSunCIWorkflow' }}
        isExternal
        hook="codecov-workflow-intro"
      >
        .sun-ci.yml example
      </A>{' '}
      .
    </div>
  )
}

export default ExampleBlurb
