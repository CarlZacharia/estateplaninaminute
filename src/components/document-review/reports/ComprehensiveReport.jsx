import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';
import {
  ExpandMore,
  Warning,
  Error as ErrorIcon,
  CheckCircle,
  Info,
  TrendingUp,
  Assignment,
  AttachMoney
} from '@mui/icons-material';

export default function ComprehensiveReport({ report, analyses }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return <ErrorIcon color="error" />;
      case 'high':
        return <Warning color="warning" />;
      case 'medium':
        return <Info color="info" />;
      case 'low':
        return <CheckCircle color="success" />;
      default:
        return <Info />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'info';
      case 'needs_improvement':
        return 'warning';
      case 'critical_issues':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Executive Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Executive Summary
            </Typography>
            <Chip 
              label={report.overall_rating?.replace('_', ' ').toUpperCase()} 
              color={getRatingColor(report.overall_rating)}
              size="large"
            />
          </Box>

          <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
            {report.executive_summary}
          </Typography>

          {report.estimated_total_cost && (
            <Alert severity="info" icon={<AttachMoney />}>
              <strong>Estimated Cost to Address All Recommendations:</strong> {report.estimated_total_cost}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Document Summary */}
      {report.document_summary && report.document_summary.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Document Review Summary
            </Typography>

            <Grid container spacing={2}>
              {report.document_summary.map((doc, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      height: '100%',
                      borderLeft: 4,
                      borderColor: `${getRatingColor(doc.rating)}.main`
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {doc.document_type?.toUpperCase()}
                    </Typography>
                    <Chip 
                      label={doc.status?.toUpperCase()} 
                      size="small"
                      color={doc.status === 'present' ? 'success' : 'error'}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2">
                      {doc.key_finding}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Critical Gaps */}
      {report.critical_gaps && report.critical_gaps.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="error">
              <ErrorIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Critical Gaps
            </Typography>

            <List>
              {report.critical_gaps.map((gap, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      {getPriorityIcon(gap.urgency)}
                    </ListItemIcon>
                    <ListItemText
                      primary={gap.gap}
                      secondaryTypographyProps={{ component: 'div' }}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.primary" component="span">
                            Impact:
                          </Typography>
                          {' ' + gap.impact}
                          <br />
                          <Chip
                            label={`Urgency: ${gap.urgency?.toUpperCase()}`}
                            size="small"
                            color={getPriorityColor(gap.urgency)}
                            sx={{ mt: 1 }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                  {index < report.critical_gaps.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Inconsistencies */}
      {report.inconsistencies && report.inconsistencies.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="warning.main">
              <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
              Document Inconsistencies
            </Typography>

            <List>
              {report.inconsistencies.map((inconsistency, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={inconsistency.issue}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Affected Documents:
                          </Typography>
                          {' ' + inconsistency.documents_affected?.join(', ')}
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Recommendation:
                          </Typography>
                          {' ' + inconsistency.recommendation}
                        </>
                      }
                    />
                  </ListItem>
                  {index < report.inconsistencies.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Prioritized Recommendations */}
      {report.prioritized_recommendations && report.prioritized_recommendations.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <TrendingUp sx={{ verticalAlign: 'middle', mr: 1 }} />
              Prioritized Recommendations
            </Typography>

            {['critical', 'high', 'medium', 'low'].map(priority => {
              const recs = report.prioritized_recommendations.filter(
                r => r.priority === priority
              );

              if (recs.length === 0) return null;

              return (
                <Box key={priority} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <Chip 
                      label={`${priority.toUpperCase()} Priority`}
                      color={getPriorityColor(priority)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    ({recs.length} {recs.length === 1 ? 'item' : 'items'})
                  </Typography>

                  {recs.map((rec, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Typography sx={{ flexGrow: 1 }}>
                            {rec.recommendation}
                          </Typography>
                          {rec.category && (
                            <Chip 
                              label={rec.category}
                              size="small"
                              sx={{ ml: 2 }}
                            />
                          )}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" paragraph>
                          <strong>Rationale:</strong> {rec.rationale}
                        </Typography>

                        {rec.estimated_cost && (
                          <Typography variant="body2" paragraph>
                            <strong>Estimated Cost:</strong> {rec.estimated_cost}
                          </Typography>
                        )}

                        {rec.timeline && (
                          <Typography variant="body2">
                            <strong>Timeline:</strong> {rec.timeline}
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Action Plan */}
      {report.action_plan && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Assignment sx={{ verticalAlign: 'middle', mr: 1 }} />
              Recommended Action Plan
            </Typography>

            <Grid container spacing={3}>
              {report.action_plan.immediate_actions && 
               report.action_plan.immediate_actions.length > 0 && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'error.lighter' }}>
                    <Typography variant="subtitle1" gutterBottom color="error">
                      Immediate Actions
                    </Typography>
                    <List dense>
                      {report.action_plan.immediate_actions.map((action, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <ErrorIcon color="error" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={action} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              )}

              {report.action_plan.short_term &&
               report.action_plan.short_term.length > 0 && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'warning.lighter' }}>
                    <Typography variant="subtitle1" gutterBottom color="warning.dark">
                      Short-Term (30-90 days)
                    </Typography>
                    <List dense>
                      {report.action_plan.short_term.map((action, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Warning color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={action} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              )}

              {report.action_plan.long_term &&
               report.action_plan.long_term.length > 0 && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'info.lighter' }}>
                    <Typography variant="subtitle1" gutterBottom color="info.dark">
                      Long-Term
                    </Typography>
                    <List dense>
                      {report.action_plan.long_term.map((action, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Info color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={action} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {report.next_steps && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Next Steps</strong>
          </Typography>
          <Typography variant="body2">
            {report.next_steps}
          </Typography>
        </Alert>
      )}

      {/* Individual Document Analyses */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Detailed Document Analyses
          </Typography>

          {analyses.map((analysis, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography sx={{ flexGrow: 1 }}>
                    {analysis.file_name || analysis.fileName || `Document ${index + 1}`}
                  </Typography>
                  {(analysis.overall_rating) && (
                    <Chip
                      label={analysis.overall_rating?.replace('_', ' ').toUpperCase()}
                      color={getRatingColor(analysis.overall_rating)}
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {analysis.summary || analysis.analysis?.summary || 'No summary available'}
                </Typography>

                {(analysis.recommendations?.length > 0 || analysis.analysis?.recommendations?.length > 0) && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>Key Recommendations:</Typography>
                    <List dense>
                      {(analysis.recommendations || analysis.analysis?.recommendations || []).map((rec, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>{getPriorityIcon(rec.priority)}</ListItemIcon>
                          <ListItemText
                            primary={rec.recommendation}
                            secondary={rec.rationale}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}