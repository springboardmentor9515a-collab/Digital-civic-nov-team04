import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  InputBase, 
  IconButton, 
  Divider, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  Chip,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import FilterListIcon from '@mui/icons-material/FilterList';
import { searchService } from '../../services/searchService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState({ polls: [], petitions: [], reports: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setSearchTerm(query);
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term) => {
    if (!term.trim()) return;
    setLoading(true);
    try {
      const data = await searchService.searchAll(term);
      // Ensure we have arrays even if service returns partial data
      setResults({
        polls: data.polls || [],
        petitions: data.petitions || [],
        reports: data.reports || [],
        total: (data.polls?.length || 0) + (data.petitions?.length || 0) + (data.reports?.length || 0)
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'poll': return <HowToVoteIcon sx={{ color: '#3B82F6' }} />;
      case 'petition': return <EditIcon sx={{ color: '#10B981' }} />;
      case 'report': return <ReportIcon sx={{ color: '#F59E0B' }} />;
      default: return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'poll': return '#3B82F6';
      case 'petition': return '#10B981';
      case 'report': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const handleItemClick = (item) => {
    // Navigate with search parameters to highlight and prioritize the clicked item
    const navParams = new URLSearchParams({
      search: query,
      highlight: item._id || item.id,
      from: 'search'
    });

    switch (item.type) {
      case 'poll':
        navigate(`/dashboard/polls?${navParams.toString()}`);
        break;
      case 'petition':
        navigate(`/dashboard/petitions?${navParams.toString()}`);
        break;
      case 'report':
        navigate(`/dashboard/reports?${navParams.toString()}`);
        break;
      default:
        navigate(item.url || '/dashboard');
    }
  };

  const combinedResults = [
    ...(results.polls || []),
    ...(results.petitions || []),
    ...(results.reports || [])
  ];

  const filteredResults = activeTab === 'all' 
    ? combinedResults 
    : combinedResults.filter(r => r.type === activeTab);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Search
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 4 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search petitions, polls, and reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
         <Chip 
            label={`All (${results.total})`} 
            onClick={() => setActiveTab('all')} 
            variant={activeTab === 'all' ? 'filled' : 'outlined'} 
            color="primary"
          />
          <Chip 
            icon={<HowToVoteIcon />} 
            label={`Polls (${results.polls.length})`} 
            onClick={() => setActiveTab('poll')} 
            variant={activeTab === 'poll' ? 'filled' : 'outlined'} 
            sx={{ borderColor: getTypeColor('poll'), color: activeTab === 'poll' ? 'white' : getTypeColor('poll'), bgcolor: activeTab === 'poll' ? getTypeColor('poll') : 'transparent' }}
          />
          <Chip 
            icon={<EditIcon />} 
            label={`Petitions (${results.petitions.length})`} 
            onClick={() => setActiveTab('petition')} 
            variant={activeTab === 'petition' ? 'filled' : 'outlined'}
            sx={{ borderColor: getTypeColor('petition'), color: activeTab === 'petition' ? 'white' : getTypeColor('petition'), bgcolor: activeTab === 'petition' ? getTypeColor('petition') : 'transparent' }} 
          />
          <Chip 
            icon={<ReportIcon />} 
            label={`Reports (${results.reports.length})`} 
            onClick={() => setActiveTab('report')} 
            variant={activeTab === 'report' ? 'filled' : 'outlined'}
            sx={{ borderColor: getTypeColor('report'), color: activeTab === 'report' ? 'white' : getTypeColor('report'), bgcolor: activeTab === 'report' ? getTypeColor('report') : 'transparent' }}
          />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <Grid item xs={12} key={item._id || index}>
                <Card variant="outlined">
                  <CardActionArea onClick={() => handleItemClick(item)} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                        {getIcon(item.type)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                          {item.title || item.question || 'Untitled'}
                        </Typography>
                        <Chip 
                          label={item.type.toUpperCase()} 
                          size="small" 
                          sx={{ 
                            mt: 0.5, 
                            mb: 1, 
                            bgcolor: `${getTypeColor(item.type)}20`, 
                            color: getTypeColor(item.type),
                            fontWeight: 'bold',
                            fontSize: '0.7rem'
                          }} 
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {item.description || item.snippet || 'No description available'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                <Typography variant="h6">No results found</Typography>
                <Typography variant="body2">Try adjusting your search terms</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;
